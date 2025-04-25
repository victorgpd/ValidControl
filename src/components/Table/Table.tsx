import { TableGeneral } from "./styles";

interface TableProps {
  dataSource: any[];
  columns: any[];
}

const Table = ({ dataSource, columns }: TableProps) => {
  return <TableGeneral dataSource={dataSource} columns={columns} rowKey="id" />;
};

export default Table;
