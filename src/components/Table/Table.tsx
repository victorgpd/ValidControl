import { TableGeneral } from "./styles";

interface TableProps {
  dataSource: any[];
  columns: any[];
  rowKey: string;
}

const Table = ({ dataSource, columns, rowKey }: TableProps) => {
  return <TableGeneral dataSource={dataSource} columns={columns} rowKey={rowKey} pagination={{ pageSize: 8 }} />;
};

export default Table;
