import React, { useState, useEffect, useContext, useRef } from 'react';
import { Box } from '../Box/Box';
import { NavBar } from '../NavBar/NavBar';
import {
  Button,
  Divider,
  Form,
  FormInstance,
  InputNumber,
  Select,
  Spin,
  Table,
} from 'antd';
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

interface EditableRowProps {
  index: number;
}

interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  children: React.ReactNode;
  dataIndex: keyof SetsListItem;
  record: SetsListItem;
  handleSave: (record: SetsListItem) => void;
}

export interface SetsListItem {
  id: string;
  key: React.Key;
  rowNumber: string;
  name: string;
  type: string;
  width: number | undefined;
  height: number | undefined;
  quantity: number;
}

type EditableTableProps = Parameters<typeof Table>[0];

type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;

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

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const [dataSource, setDataSource] = useState<SetsListItem[]>([]);

  const [form] = Form.useForm();
  const EditableContext = React.createContext<FormInstance<any> | null>(null);

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
  }, [currentProfileName, profileSet]);

  useEffect(() => {
    const currentProfileSystem = currentProfile?.systems.find(
      system => system.systemName === currentSystemName
    );
    currentProfileSystem
      ? setCurrentProfileSystem(currentProfileSystem)
      : setCurrentProfileSystem(null);
  }, [currentSystemName, currentProfile?.systems]);

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

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const EditableRow = ({ index, ...props }: EditableRowProps) => {
    const [form] = Form.useForm();
    return (
      <Form form={form} component={false}>
        <EditableContext.Provider value={form}>
          <tr {...props} />
        </EditableContext.Provider>
      </Form>
    );
  };

  const EditableCell: React.FC<EditableCellProps> = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
  }) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const form = useContext(EditableContext)!;

    useEffect(() => {
      if (editing) {
        inputRef.current!.focus();
      }
    }, [editing]);

    const toggleEdit = () => {
      setEditing(!editing);
      form.setFieldsValue({ [dataIndex]: record[dataIndex] });
    };

    const save = async () => {
      try {
        const values = await form.validateFields();

        toggleEdit();
        handleSave({ ...record, ...values });
      } catch (errInfo) {
        console.log('Save failed:', errInfo);
      }
    };

    let childNode = children;

    if (editable) {
      childNode = editing ? (
        <Form.Item
          style={{ margin: 0 }}
          name={dataIndex}
          rules={[
            {
              required: true,
              message: ``,
            },
          ]}
        >
          <InputNumber
            min={0}
            max={99}
            ref={inputRef}
            onPressEnter={save}
            onBlur={save}
            datatype="number"
          />
        </Form.Item>
      ) : (
        <div className="editable-cell-value-wrap" onClick={toggleEdit}>
          {children}
        </div>
      );
    }

    return <td {...restProps}>{childNode}</td>;
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const defaultColumns: (
    | {}
    | (ColumnTypes[number] & {
        editable?: boolean;
        dataIndex: string;
      })
  )[] = [
    {
      title: '№',
      dataIndex: 'rowNumber',
      align: 'center',
      width: '3%',
    },
    {
      title: 'Назва',
      dataIndex: 'name',
      align: 'left',
    },
    {
      title: 'Тип',
      dataIndex: 'type',
      width: '50%',
      //   responsive: ['md'],
    },
    {
      title: 'Ширина',
      dataIndex: 'width',
      width: '3%',
      align: 'center',
    },
    {
      title: 'Висота',
      dataIndex: 'height',
      width: '3%',
      align: 'center',
    },
    {
      title: 'Кількість',
      dataIndex: 'quantity',
      align: 'center',
    },
    Table.SELECTION_COLUMN,
  ];

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const handleSave = (row: SetsListItem) => {
    // setFSetsArray(prev =>
    //   prev.map(set => {
    //     if (set.id === row.id) return { ...set, quantitySet: row.quantity };
    //     return set;
    //   })
    // );
  };

  const columns = defaultColumns.map(col => {
    const newCol = col as ColumnTypes[number] & {
      editable: boolean;
      dataIndex: string;
    };
    if (!newCol.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: SetsListItem) => ({
        record,
        editable: newCol.editable,
        dataIndex: newCol.dataIndex,
        title: newCol.title,
        handleSave,
      }),
    };
  });

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
          <Table
            caption
            components={components}
            rowClassName={() => 'editable-row'}
            bordered
            dataSource={dataSource}
            columns={columns as ColumnTypes}
            pagination={false}
            style={{ marginTop: 30, width: '100%', minWidth: '290px' }}
            size="small"
            scroll={{ x: 336 }}
            rowSelection={rowSelection}
            summary={dataSource => {
              let lotalPrice = dataSource.reduce((acc, item) => {
                const currentItem = item as SetsListItem;
                return acc + +currentItem.quantity;
              }, 0);
              return (
                <>
                  <Table.Summary.Row
                    style={{ fontWeight: 'normal', fontSize: '16px' }}
                  >
                    <Table.Summary.Cell
                      index={0}
                      colSpan={3}
                    ></Table.Summary.Cell>
                    <Table.Summary.Cell index={1} colSpan={2}>
                      Всього
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={2} colSpan={2}>
                      <p>{`${lotalPrice} компл.`}</p>
                    </Table.Summary.Cell>
                  </Table.Summary.Row>
                </>
              );
            }}
          ></Table>
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
