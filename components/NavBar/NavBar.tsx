import React, { useEffect } from 'react';
import { Box } from '../Box/Box';
import { CurrentRate } from '../CurrentRate/CurrentRate';
import { Button } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { NextLink } from '../NextLink/NextLink';
import { NextLinkStyledButton } from '../FInputPage/FInputPage.styled';
import { useUserContext } from '@/context/state';
import axios, { InternalAxiosRequestConfig } from 'axios';
import { IUser } from '@/interfaces/interfaces';
import { getUserDto } from '@/utils/mongo/getUserDto';
import { useSession, signOut } from 'next-auth/react';

export const NavBar = () => {
  const { user, setUser } = useUserContext();
  const { data: session, status: sessionStatus } = useSession();
  console.log('sessionInNavBar', session);

  // axios interceptor request

  const $api = axios.create({ withCredentials: true });
  $api.interceptors.request.use((config: InternalAxiosRequestConfig<any>) => {
    const data = localStorage.getItem('user');
    if (data && JSON.parse(data).accessToken)
      config.headers.Authorization = `Bearer ${JSON.parse(data).accessToken}`;
    return config;
  });

  // axios interceptor response
  $api.interceptors.response.use(
    function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response;
    },
    async function (error) {
      if (error.response.status === 401 && !error.config?._isRetry) {
        const config = error.config;
        config._isRetry = true;
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_HOST}/users/auth/refresh`,
          { withCredentials: true }
        );
        config._isRetry = false;
        localStorage.setItem('user', JSON.stringify(response.data.user));
        console.log(response.data);
        return $api.request(config);
      }
      return error;
    }
  );

  useEffect(() => {
    if (sessionStatus !== 'loading' && !session) {
      const data = localStorage.getItem('user');
      if (data) {
        const userLS: IUser = JSON.parse(data);
        if (userLS?.accessToken && !user)
          $api
            .get(`${process.env.NEXT_PUBLIC_API_HOST}/users/getUser`)
            .then(res => {
              const userDB = res.data;
              setUser(userDB);
              const userDto = getUserDto(userDB);
              localStorage.setItem(
                'user',
                JSON.stringify({ ...userDto, accessToken: userDB.accessToken })
              );
            })
            .catch(console.log);
      } else localStorage.removeItem('user');
    }
  }, [$api, setUser, user, session, sessionStatus]);

  useEffect(() => {
    if (session && sessionStatus === 'authenticated') {
      const { email, image, name } = session.user!;
      const options = { email, image, name };
      axios
        .post(
          `${process.env.NEXT_PUBLIC_API_HOST}/users/getUserWithGoogleAuth`,
          options
        )
        .then(res => {
          const userDB = res.data;
          setUser(userDB);
          localStorage.setItem(
            'user',
            JSON.stringify({ ...userDB, accessToken: userDB.accessToken })
          );
        })
        .catch(console.log);
    }
  }, [session, sessionStatus]);

  const onLogoutButtonClick = async () => {
    try {
      await $api.get(`${process.env.NEXT_PUBLIC_API_HOST}/users/logout`);
      localStorage.removeItem('user');
      setUser(null);
      if (session) {
        await signOut();
      }
    } catch (error) {}
  };

  return (
    <Box display="flex" justifyContent="start" alignItems="center">
      <CurrentRate />
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        minWidth={300}
        ml="auto"
        padding="0 30px"
      >
        {user?.email ? (
          <>
            <Button icon={<LogoutOutlined />} onClick={onLogoutButtonClick}>
              {user.name || user.email}
            </Button>
          </>
        ) : (
          <>
            <NextLink path="./account/login">Sign In</NextLink>
            <NextLinkStyledButton href="./account/register">
              Try Free
            </NextLinkStyledButton>
          </>
        )}
      </Box>
    </Box>
  );
};
