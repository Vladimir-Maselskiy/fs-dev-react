import React, { useContext, useEffect, useRef, useState } from 'react';
import { InputNumber, Tooltip } from 'antd';
import { Button, Form, Table } from 'antd';
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  CopyOutlined,
  DeleteRowOutlined,
  EditOutlined,
} from '@ant-design/icons';
import type { FormInstance } from 'antd/es/form';
import { IFSet } from '@/interfaces/interfaces';
import { Box } from '../Box/Box';
import { getSetsListDataSource } from '@/utils/data-utils/getSetsListDataSource';
import { useMediaQuery } from '@/hooks';
import { useFSetsContext } from '@/context/state';
import { getIdForNewFSet } from '@/utils/data-utils/getIdForNewFSet';

const EditableContext = React.createContext<FormInstance<any> | null>(null);

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

type EditableTableProps = Parameters<typeof Table>[0];

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

type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;

type TProps = {
  setFSet: React.Dispatch<React.SetStateAction<IFSet>>;
  setButtonTitle: React.Dispatch<React.SetStateAction<string>>;
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

export const FSetsListTable = ({ setFSet, setButtonTitle }: TProps) => {
  const isWide = useMediaQuery(400);
  const { fSetsArray, setFSetsArray } = useFSetsContext();

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [dataSource, setDataSource] = useState<SetsListItem[]>(
    getSetsListDataSource(fSetsArray)
  );
  const [isArrowDownDisabled, setIsArrowDownDisabled] = useState(true);
  const [isArrowUpDisabled, setIsArrowUpDisabled] = useState(true);

  useEffect(() => {
    setDataSource(getSetsListDataSource(fSetsArray));
  }, [fSetsArray]);

  useEffect(() => {
    const index = fSetsArray.findIndex(set => set.id === selectedRowKeys[0]);
    if (selectedRowKeys.length !== 1) {
      setIsArrowUpDisabled(true);
      setIsArrowDownDisabled(true);
    } else {
      if (index === 0) {
        setIsArrowUpDisabled(true);
      } else setIsArrowUpDisabled(false);
      if (index === fSetsArray.length - 1) {
        setIsArrowDownDisabled(true);
      } else setIsArrowDownDisabled(false);
    }
  }, [selectedRowKeys, fSetsArray]);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
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
      title: isWide ? 'Ширина' : 'Шир.',
      dataIndex: 'width',
      width: '3%',
      align: 'center',
    },
    {
      title: isWide ? 'Висота' : 'Вис.',
      dataIndex: 'height',
      width: '3%',
      align: 'center',
    },
    {
      title: isWide ? 'Кількість' : 'К-ть.',
      dataIndex: 'quantity',
      align: 'center',
    },
    Table.SELECTION_COLUMN,
  ];

  const handleSave = (row: SetsListItem) => {
    setFSetsArray(prev =>
      prev.map(set => {
        if (set.id === row.id) return { ...set, quantitySet: row.quantity };
        return set;
      })
    );
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
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

  const handleReplace = (keys: React.Key[], direction: 'top' | 'bottom') => {
    const index = fSetsArray.findIndex(set => set.id === keys[0]);
    if (index !== -1) {
      let move = 0;
      if (direction === 'top') {
        move = 1;
      } else move = -1;

      setFSetsArray(prev => {
        const temp = prev[index];
        prev[index] = prev[index - move];
        prev[index - move] = temp;
        return [...prev];
      });
    }
  };

  const handleDelete = (keys: React.Key[]) => {
    setFSetsArray(prev => prev.filter(set => !keys.includes(set.id)));
    setSelectedRowKeys([]);
  };

  const handleEdit = (keys: React.Key[]) => {
    const fSet = fSetsArray.find(set => set.id === keys[0]);
    if (fSet) setFSet(fSet);
    setButtonTitle('Змінити');
    setSelectedRowKeys([]);
  };
  const handleCopy = (keys: React.Key[]) => {
    const fSet = fSetsArray.find(set => set.id === keys[0]);
    if (fSet)
      setFSetsArray(prev => [
        ...prev,
        { ...fSet, id: getIdForNewFSet(fSetsArray) },
      ]);
  };

  return (
    <Box display="flex" width="100%" flexDirection="column">
      <Box display="flex" justifyContent="flex-end">
        <Tooltip title="Видалити">
          <Button
            type="primary"
            style={{ width: '80px', height: '40px' }}
            disabled={!(selectedRowKeys.length > 0)}
            icon={
              <DeleteRowOutlined style={{ fontSize: '25px', color: 'white' }} />
            }
            onClick={() => {
              handleDelete(selectedRowKeys);
            }}
          ></Button>
        </Tooltip>

        <Tooltip title="Перемістити вгору">
          <Button
            type="primary"
            disabled={isArrowUpDisabled}
            style={{ width: '80px', height: '40px', marginLeft: 10 }}
            icon={
              <ArrowUpOutlined style={{ fontSize: '25px', color: 'white' }} />
            }
            onClick={() => {
              handleReplace(selectedRowKeys, 'top');
            }}
          ></Button>
        </Tooltip>

        <Tooltip title="Перемістити вниз">
          <Button
            type="primary"
            style={{ width: '80px', height: '40px', marginLeft: 10 }}
            disabled={isArrowDownDisabled}
            icon={
              <ArrowDownOutlined style={{ fontSize: '25px', color: 'white' }} />
            }
            onClick={() => {
              handleReplace(selectedRowKeys, 'bottom');
            }}
          ></Button>
        </Tooltip>

        <Tooltip title="Копіювати">
          <Button
            type="primary"
            style={{ width: '80px', height: '40px', marginLeft: 10 }}
            disabled={selectedRowKeys.length !== 1}
            icon={<CopyOutlined style={{ fontSize: '25px', color: 'white' }} />}
            onClick={() => {
              handleCopy(selectedRowKeys);
            }}
          ></Button>
        </Tooltip>
        <Tooltip title="Видалити">
          <Button
            type="primary"
            style={{ width: '80px', height: '40px', marginLeft: 10 }}
            disabled={selectedRowKeys.length !== 1}
            icon={<EditOutlined style={{ fontSize: '25px', color: 'white' }} />}
            onClick={() => {
              handleEdit(selectedRowKeys);
            }}
          ></Button>
        </Tooltip>
      </Box>
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
                <Table.Summary.Cell index={0} colSpan={3}></Table.Summary.Cell>
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
      />
    </Box>
  );
};
