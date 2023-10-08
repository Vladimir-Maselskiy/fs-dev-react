import React, { useState, useEffect } from 'react';
import { Box } from '../Box/Box';
import { NavBar } from '../NavBar/NavBar';

import { Divider, Select, Spin } from 'antd';
import Image from 'next/image';
import { profile } from '../../data/profile.json';
import { DefaultOptionType } from 'antd/es/select';
import {
  IProfile,
  TProfileColors,
  TProfileNames,
  TSystems,
} from '@/interfaces/interfaces';
import { StyledLabel } from './LaminationPage.styled';

export const LaminationPage = () => {
  const { Option } = Select;
  const profileSet = profile as IProfile[];
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [currentProfileName, setCurrentProfileName] =
    useState<TProfileNames | null>(null);
  const [currentSystemName, setCurrentSystemName] = useState<string | null>(
    null
  );
  const [currentProfileColor, setCurrentProfileColor] =
    useState<TProfileColors | null>(null);
  const [currentProfile, setCurrentProfile] = useState<IProfile | null>(null);
  const [currentProfileSystem, setCurrentProfileSystem] =
    useState<TSystems | null>(null);

  useEffect(() => {
    setIsPageLoaded(true);
  }, []);

  useEffect(() => {
    if (currentProfileName) {
      const currentProfile = profileSet.find(
        profile => profile.profileName === currentProfileName
      );
      currentProfile
        ? setCurrentProfile(currentProfile)
        : setCurrentProfile(null);
    }
  }, [currentProfileName]);

  useEffect(() => {
    const currentProfileSystem = currentProfile?.systems.find(
      system => system.systemName === currentSystemName
    );
    currentProfileSystem
      ? setCurrentProfileSystem(currentProfileSystem)
      : setCurrentProfileSystem(null);
  }, [currentSystemName]);

  useEffect(() => {
    currentProfile &&
      setCurrentSystemName(currentProfile.systems[0].systemName);
  }, [currentProfile]);

  useEffect(() => {
    currentProfileSystem &&
      setCurrentProfileColor(currentProfileSystem.color[0]);
  }, [currentProfileSystem]);

  const onChangeSelect = (value: string) => {
    const currentValue = value as TProfileNames;
    setCurrentProfileName(currentValue);
  };

  const onChangeSystemNameSelect = (value: string) => {
    setCurrentSystemName(value);
  };
  const onChangeProfileColorSelect = (value: string) => {
    setCurrentProfileColor(value as TProfileColors);
  };

  return isPageLoaded ? (
    <Box p="20px">
      <NavBar />
      <Divider />
      <Box display="flex" justifyContent={'space-around'} alignItems={'center'}>
        <Image
          src="/laminates-foto.png"
          alt={'laminates-foto'}
          width={100}
          height={100}
        />
        <p>Ламінація від Вікно-Центр</p>
      </Box>
      <Divider />
      <Box display="flex" flexDirection="column">
        <Box>
          <StyledLabel>Профіль:</StyledLabel>
          <Select
            placeholder="Оберіть профільну систему"
            style={{ width: 200 }}
            onChange={onChangeSelect}
          >
            {profileSet.map(profile => (
              <Option key={profile.profileName} value={profile.profileName}>
                {profile.profileName}
              </Option>
            ))}
          </Select>
        </Box>
        <Box mt={20}>
          <StyledLabel>Модель:</StyledLabel>
          <Select
            value={currentSystemName}
            disabled={!currentProfile}
            style={{ width: 200 }}
            onChange={onChangeSystemNameSelect}
          >
            {currentProfile?.systems.map(system => (
              <Option key={system.systemName} value={system.systemName}>
                {system.systemName}
              </Option>
            ))}
          </Select>
        </Box>
        <Box mt={20}>
          <StyledLabel>Колір:</StyledLabel>
          <Select
            value={currentProfileColor}
            disabled={!currentSystemName}
            style={{ width: 200 }}
            onChange={onChangeProfileColorSelect}
          >
            {currentProfileSystem?.color.map(color => (
              <Option key={color} value={color}>
                {color}
              </Option>
            ))}
          </Select>
        </Box>
      </Box>

      {/* <ModalLayout
        isModalOpen={false}
        setIsModalOpen={setIsModalOpen}
        currentModal={CurrentModal}
        modalNumber={currentModalNumber}
        
      /> */}
    </Box>
  ) : (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Spin size="large" spinning={!isPageLoaded} />
    </Box>
  );
};
