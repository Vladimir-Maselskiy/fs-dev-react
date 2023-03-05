import React, { useContext, useEffect, useRef, useState } from 'react';
import { Checkbox, InputNumber, InputRef } from 'antd';
import { Button, Form, Input, Popconfirm, Table } from 'antd';
import { DeleteRowOutlined } from '@ant-design/icons';
import { useMedia } from 'react-use';
import type { FormInstance } from 'antd/es/form';
import { IArticleItem, IFSet } from '@/interfaces/interfaces';
import { getDataSource } from '@/utils/data-utils/getDataSource';
import { Box } from '../Box/Box';
import { getSetsListDataSource } from '@/utils/data-utils/getSetsListDataSource';
import { useMediaQuery } from '@/hooks';
import { useFSetsContext } from '@/context/state';

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

export const FSetsListTable = () => {
  const isWide = useMediaQuery(400);
  const { fSetsArray, setFSetsArray } = useFSetsContext();

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [dataSource, setDataSource] = useState<SetsListItem[]>(
    getSetsListDataSource(fSetsArray)
  );

  useEffect(() => {
    setDataSource(getSetsListDataSource(fSetsArray));
  }, [fSetsArray]);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const handleDelete = (keys: React.Key[]) => {
    setFSetsArray(prev => prev.filter(set => !keys.includes(set.id)));
    setSelectedRowKeys([]);
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
      editable: true,
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
        // summary={dataSource => {
        //   let lotalPrice = dataSource.reduce((acc, item) => {
        //     const currentItem = item as SetsListItem;
        //     return acc + +currentItem.sum;
        //   }, 0);
        //   return (
        //     <>
        //       <Table.Summary.Row
        //         style={{ fontWeight: 'bold', fontSize: '16px' }}
        //       >
        //         <Table.Summary.Cell index={0} colSpan={3}></Table.Summary.Cell>
        //         <Table.Summary.Cell index={1} colSpan={2}>
        //           Всього
        //         </Table.Summary.Cell>
        //         <Table.Summary.Cell index={2} colSpan={2}>
        //           <p>{`${lotalPrice.toFixed(2)} грн`}</p>
        //         </Table.Summary.Cell>
        //       </Table.Summary.Row>
        //     </>
        //   );
        // }}
      />
    </Box>
  );
};
