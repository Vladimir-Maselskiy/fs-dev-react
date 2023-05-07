import React, { useContext, useEffect, useRef, useState } from 'react';
import { InputRef } from 'antd';
import { Button, Form, Input, Popconfirm, Table } from 'antd';
import { DeleteRowOutlined } from '@ant-design/icons';
import type { FormInstance } from 'antd/es/form';
import { IArticleItem } from '@/interfaces/interfaces';
import { getDataSource } from '@/utils/data-utils/getDataSource';
import { Box } from '../Box/Box';
import { useMediaQuery } from '@/hooks';
import { getPdfFile } from '@/utils/pdf/getPdfFile';

const EditableContext = React.createContext<FormInstance<any> | null>(null);

export interface IItem {
  key: React.Key;
  rowNumber: string;
  article: string;
  name: string;
  quantity: number;
  price: string;
  discount: number;
  sum: string;
}

interface EditableRowProps {
  index: number;
}
interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  children: React.ReactNode;
  dataIndex: keyof IItem;
  record: IItem;
  handleSave: (record: IItem) => void;
}

type EditableTableProps = Parameters<typeof Table>[0];

// export interface DataType {
//   key: React.Key;
//   rowNumber: string;
//   article: string;
//   name: string;
//   quantity: number;
//   price: string;
//   sum: string;
// }

type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;

type TTableProps = {
  tableSets: IArticleItem[];
  euroRate: string;
  discount: number;
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

export const FSetsOrderTable = ({
  tableSets,
  euroRate,
  discount,
}: TTableProps) => {
  const isWide = useMediaQuery(400);
  const isWide767 = useMediaQuery(767);

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const [dataSourceWithDiscount, setDataSourceWithDiscount] = useState<IItem[]>(
    getDataSource(tableSets, euroRate, discount)
  );
  const [dataSourceBasePrice, setDataSourceBasePrice] = useState<IItem[]>(
    getDataSource(tableSets, euroRate)
  );

  useEffect(() => {
    setDataSourceWithDiscount(getDataSource(tableSets, euroRate, discount));
  }, [tableSets, euroRate, discount]);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const onGetPdfClick = () => {
    getPdfFile(dataSourceWithDiscount);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const handleDelete = (keys: React.Key[]) => {
    const newData = dataSourceWithDiscount.filter(
      item => !keys.includes(item.key)
    );
    setSelectedRowKeys([]);
    setDataSourceWithDiscount(newData);
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
      title: 'Знижка',
      dataIndex: 'discount',
      editable: true,
      align: 'center',
      responsive: ['md'],
    },

    {
      title: 'Сума',
      dataIndex: 'sum',
      align: 'center',
    },
    Table.SELECTION_COLUMN,
  ];

  const handleSave = (row: IItem) => {
    const newData = [...dataSourceWithDiscount];
    const index = newData.findIndex(item => row.key === item.key);
    const item = newData[index];
    const itemWithBasePrice = dataSourceBasePrice.find(
      itemWithBasePrice => itemWithBasePrice.article === item.article
    );
    if (itemWithBasePrice) {
      row.price = (
        (+itemWithBasePrice.price * (100 - row.discount)) /
        100
      ).toFixed(2);
      row.sum = (
        row.quantity *
        +itemWithBasePrice.price *
        ((100 - row.discount) / 100)
      ).toFixed(2);
    }
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSourceWithDiscount(newData);
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
      onCell: (record: IItem) => ({
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
          <DeleteRowOutlined style={{ fontSize: '25px', color: 'white' }} />
        }
        onClick={() => {
          handleDelete(selectedRowKeys);
        }}
      ></Button>
      <Table
        components={components}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={dataSourceWithDiscount}
        columns={columns as ColumnTypes}
        pagination={false}
        style={{ marginTop: 30, width: '100%', minWidth: '290px' }}
        size="small"
        scroll={{ x: 336 }}
        rowSelection={rowSelection}
        summary={dataSource => {
          let lotalPrice = dataSource.reduce((acc, item) => {
            const currentItem = item as IItem;
            return acc + +currentItem.sum;
          }, 0);
          return (
            <>
              <Table.Summary.Row
                style={{ fontWeight: 'bold', fontSize: '16px' }}
              >
                <Table.Summary.Cell index={0} colSpan={3}></Table.Summary.Cell>
                <Table.Summary.Cell index={1} colSpan={isWide767 ? 2 : 1}>
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
      <Button onClick={onGetPdfClick}>Get PDF</Button>
    </Box>
  );
};
