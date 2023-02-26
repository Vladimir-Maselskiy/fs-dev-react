import React, { useContext, useEffect, useRef, useState } from 'react';
import { InputNumber, InputRef } from 'antd';
import { Button, Form, Input, Popconfirm, Table } from 'antd';
import type { FormInstance } from 'antd/es/form';

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

interface DataType {
  key: React.Key;
  rowNumber: string;
  article: string;
  name: string;
  quantity: number;
  price: string;
  sum: string;
}

type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
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
      <div
        className="editable-cell-value-wrap"
        style={{ paddingRight: 24 }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

export const FSetsOrderTable = () => {
  const [dataSource, setDataSource] = useState<DataType[]>([
    {
      key: '0',
      rowNumber: '1',
      article: '211695',
      name: 'Ножницы петлевые 600 MM FFB=401-600/290-490',
      quantity: 2,
      price: '156.16',
      sum: '352.32',
    },
    {
      key: '1',
      rowNumber: '2',
      article: '228430',
      name: 'Угловая передача с микропроветриванием MM FFB=360-2450',
      quantity: 2,
      price: '64.14',
      sum: '128.29',
    },
  ]);

  const handleDelete = (key: React.Key) => {
    const newData = dataSource.filter(item => item.key !== key);
    setDataSource(newData);
  };

  const defaultColumns: (ColumnTypes[number] & {
    editable?: boolean;
    dataIndex: string;
  })[] = [
    {
      title: '№',
      dataIndex: 'posNumber',
      width: '7%',
    },
    {
      title: 'Артикул',
      dataIndex: 'article',
    },
    {
      title: 'Назва',
      dataIndex: 'name',
      width: '40%',
    },
    {
      title: 'Кількість',
      dataIndex: 'quantity',
      editable: true,
      width: '7%',
    },
    {
      title: 'Ціна',
      dataIndex: 'price',
    },
    {
      title: 'Сума',
      dataIndex: 'sum',
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => {
              const rec = record as Item;
              return handleDelete(rec.key);
            }}
          >
            <a>Delete</a>
          </Popconfirm>
        ) : null,
    },
  ];

  //   const handleAdd = () => {
  //     const newData: DataType = {
  //       key: `${count}`,
  //       rowNumber: `${count}`,
  //       article: '211695',
  //       name: 'Ножницы петлевые 600 MM FFB=401-600/290-490',
  //       quantity: 1,
  //       price: '156.16',
  //       sum: '310.31',
  //     };
  //     setDataSource([...dataSource, newData]);
  //     setCount(count + 1);
  //   };

  const handleSave = (row: DataType) => {
    const newData = [...dataSource];
    const index = newData.findIndex(item => row.key === item.key);
    const item = newData[index];
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
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: DataType) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

  return (
    <div>
      <Table
        components={components}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={dataSource}
        columns={columns as ColumnTypes}
      />
      {/* <Button onClick={handleAdd} type="primary">
        Додати артикул
      </Button> */}
    </div>
  );
};
