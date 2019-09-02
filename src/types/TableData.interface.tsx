export interface TableData {
  dataDef: {
    headers: {
      label: string;
      key: string;
    }[];
    columns: string[];
    override?: any;
  };
  data: any[];
}
