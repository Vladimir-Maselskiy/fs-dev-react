import React, { useContext, useEffect, useRef, useState } from 'react';
import { Checkbox, InputRef } from 'antd';
import { Button, Form, Input, Popconfirm, Table } from 'antd';
import { DeleteRowOutlined } from '@ant-design/icons';
import { useMedia } from 'react-use';
import type { FormInstance } from 'antd/es/form';
import { IArticleItem } from '@/interfaces/interfaces';
import { getDataSource } from '@/utils/data-utils/getDataSource';
import { Box } from '../Box/Box';

const EditableContext = React.createContext<FormInstance<any> | null>(null);

interface Item {
  key: React.Key;
  rowNumber: string;
  article: string;
  name: string;
  quantity: number;
  price: string;
  sum: string;
}

interface EditableRowProps {
  index: number;
}
interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  children: React.ReactNode;
  dataIndex: keyof Item;
  record: Item;
  handleSave: (record: Item) => void;
}

type EditableTableProps = Parameters<typeof Table>[0];

export interface DataType {
  key: React.Key;
  rowNumber: string;
  article: string;
  name: string;
  quantity: number;
  price: string;
  sum: string;
}

type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;

type TTableProps = {
  tableSets: IArticleItem[];
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
  const inputRef = useRef<InputRef>(null);
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
      console.log('record', record);
      console.log('values', values);
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
        <Input
          min={0}
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

export const FSetsOrderTable = ({ tableSets }: TTableProps) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  useEffect(() => {
    setDataSource(getDataSource(tableSets));
  }, [tableSets]);

  const [dataSource, setDataSource] = useState<DataType[]>(
    getDataSource(tableSets)
  );

  const [isWide, setIsWide] = useState(false);
  useEffect(() => {
    const media = window.matchMedia('(min-width: 370px)');
    setIsWide(media.matches);
  }, []);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const handleDelete = (keys: React.Key[]) => {
    const newData = dataSource.filter(item => !keys.includes(item.key));
    setSelectedRowKeys([]);
    setDataSource(newData);
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
      title: 'Артикул',
      dataIndex: 'article',
      align: 'center',
    },
    {
      title: 'Назва',
      dataIndex: 'name',
      width: '50%',
      responsive: ['md'],
    },
    {
      title: isWide ? 'Кількість' : 'К-ть',
      dataIndex: 'quantity',
      editable: true,
      width: '3%',
      align: 'center',
    },
    {
      title: 'Ціна',
      dataIndex: 'price',
      align: 'center',
    },
    {
      title: 'Сума',
      dataIndex: 'sum',
      align: 'center',
    },
    Table.SELECTION_COLUMN,
  ];

  const handleAdd = () => {
    // const newData: DataType = {
    //   key: `${count}`,
    //   rowNumber: `${count}`,
    //   article: '211695',
    //   name: 'Ножницы петлевые 600 MM FFB=401-600/290-490',
    //   quantity: 1,
    //   price: '156.16',
    //   sum: '310.31',
    // };
    // setDataSource([...dataSource, newData]);
    // setCount(count + 1);
  };

  const handleSave = (row: DataType) => {
    const newData = [...dataSource];
    const index = newData.findIndex(item => row.key === item.key);
    const item = newData[index];
    row.sum = (row.quantity * +row.price).toFixed(2);
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
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
      onCell: (record: DataType) => ({
        record,
        editable: newCol.editable,
        dataIndex: newCol.dataIndex,
        title: newCol.title,
        handleSave,
      }),
    };
  });

  return (
    <Box display="flex" width="100%" flexDirection="column">
      <Button
        type="primary"
        style={{ width: '80px', height: '40px', marginLeft: 'auto' }}
        disabled={!(selectedRowKeys.length > 0)}
        icon={
          <DeleteRowOutlined
            style={{ fontSize: '25px', color: 'white' }}
            onClick={() => {
              handleDelete(selectedRowKeys);
            }}
          />
        }
      ></Button>
      <Table
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
            const currentItem = item as DataType;
            return acc + +currentItem.sum;
          }, 0);
          return (
            <>
              <Table.Summary.Row
                style={{ fontWeight: 'bold', fontSize: '16px' }}
              >
                <Table.Summary.Cell index={0} colSpan={3}></Table.Summary.Cell>
                <Table.Summary.Cell index={1} colSpan={2}>
                  Всього
                </Table.Summary.Cell>
                <Table.Summary.Cell index={2} colSpan={2}>
                  <p>{`${lotalPrice.toFixed(2)} грн`}</p>
                </Table.Summary.Cell>
              </Table.Summary.Row>
            </>
          );
        }}
      />
      <Button disabled={true} onClick={handleAdd} type="primary">
        Додати артикул
      </Button>
    </Box>
  );
};
