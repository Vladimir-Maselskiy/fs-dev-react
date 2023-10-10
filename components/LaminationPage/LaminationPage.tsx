import React, { useState, useEffect } from 'react';
import { Box } from '../Box/Box';
import { NavBar } from '../NavBar/NavBar';
import { Button, Divider, Select, Spin, Table } from 'antd';
import Image from 'next/image';
import { profile } from '../../data/profile.json';
import {
  IProfile,
  TProfileColors,
  TProfileNames,
  TSystems,
} from '@/interfaces/interfaces';
import {
  ContentWrapper,
  ProfileSelectWrapper,
  StyledLabel,
  TableWrapper,
} from './LaminationPage.styled';

export const LaminationPage = () => {
  type TLaminationSide = 'in' | 'both' | 'out' | 'inAndOut';
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
  const [currentLaminationSide, setCurrentLaminationSide] =
    useState<TLaminationSide | null>(null);

  const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(true);
  const [isPrevButtonDisabled, setIsPrevButtonDisabled] = useState(true);
  const [contentStep, setContentStep] = useState(1);

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

  useEffect(() => {
    if (
      currentProfileColor &&
      currentSystemName &&
      currentLaminationSide &&
      contentStep <= 1
    ) {
      setIsNextButtonDisabled(false);
    } else {
      setIsNextButtonDisabled(true);
    }
  }, [
    currentProfileColor,
    currentSystemName,
    currentLaminationSide,
    contentStep,
  ]);

  useEffect(() => {
    if (contentStep <= 1) {
      setIsPrevButtonDisabled(true);
    } else {
      setIsPrevButtonDisabled(false);
    }
  }, [contentStep]);

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

  const onChangeLaminationSide = (value: TLaminationSide) => {
    setCurrentLaminationSide(value);
  };

  const onStepButtonClick = (value: number) => {
    setContentStep(p => p + value);
  };

  return isPageLoaded ? (
    <Box position="relative" p="20px" overflow="hidden">
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
      <ContentWrapper>
        <ProfileSelectWrapper contentStep={contentStep}>
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
          <Box mt={20}>
            <StyledLabel>Тип:</StyledLabel>
            <Select
              value={currentLaminationSide}
              placeholder="Оберіть тип ламінації"
              style={{ width: 200 }}
              onChange={onChangeLaminationSide}
            >
              <Option value={'out'}>зовнішня</Option>
              <Option value={'both'}>двостороння</Option>
              <Option value={'in'}>внутрішня</Option>
              <Option value={'outAndIn'}>зовнішня/внутрішня</Option>
            </Select>
          </Box>
        </ProfileSelectWrapper>
        <TableWrapper contentStep={contentStep}>
          <Table></Table>
        </TableWrapper>
      </ContentWrapper>
      <Box display="flex" justifyContent="center" mt={40}>
        <Box display="flex" justifyContent="space-between" width={250}>
          <Button
            type="primary"
            disabled={isPrevButtonDisabled}
            onClick={() => onStepButtonClick(-1)}
          >
            Назад
          </Button>
          <Button
            type="primary"
            disabled={isNextButtonDisabled}
            onClick={() => onStepButtonClick(+1)}
          >
            Далі
          </Button>
        </Box>
      </Box>
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
