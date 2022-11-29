import React from "react";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
// import { SearchOutlined } from "@ant-design/icons";
// import { Button, Input, Space } from "antd";

// import Highlighter from "react-highlight-words";

const DataTables = ({ data, columns, conditionalRowStyles = [] }) => {
  // const [searchText, setSearchText] = useState("");
  // const [searchedColumn, setSearchedColumn] = useState("");
  // const searchInput = useRef(null);
  const tableData = {
    columns,
    data,
  };

  const customStyles = {
    rows: {
      style: {
        height: "auto", // override the row height
        minHeight: "30px!important",
        borderRadius: "10px",
      },
    },
    headCells: {
      style: {
        // backgroundColor: "#637485",
        backgroundColor: "#00417e",
        width: "100%",
        height: "40px!important",
        maxHeight: "40px",
        color: "#fff",
        display: "block",
        textTransform: "capitalize",
        fontSize: "13.5px",
        fontWeight: "bold",
      },
    },
    cells: {
      style: {
        minHeight: "40px!important",
        fontSize: "12.5px",
        // resize: 'horizontal',
        // overflow: 'auto',
        // width: '103px',
        // height: '49px',
        // margin: '0px',
        // padding: '0px',
        // border: "1px solid black",
        // display: "block"
      },
    },
  };

  // const handleSearch = (selectedKeys, confirm, dataIndex) => {
  //   confirm();
  //   setSearchText(selectedKeys[0]);
  //   setSearchedColumn(dataIndex);
  // };

  // const handleReset = (clearFilters) => {
  //   clearFilters();
  //   setSearchText("");
  // };

  // const getColumnSearchProps = (dataIndex) => ({
  //   filterDropdown: ({
  //     setSelectedKeys,
  //     selectedKeys,
  //     confirm,
  //     clearFilters,
  //   }) => (
  //     <div
  //       style={{
  //         padding: 8,
  //       }}
  //     >
  //       <Input
  //         ref={searchInput}
  //         placeholder={`Search ${dataIndex}`}
  //         value={selectedKeys[0]}
  //         onChange={(e) =>
  //           setSelectedKeys(e.target.value ? [e.target.value] : [])
  //         }
  //         onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
  //         style={{
  //           marginBottom: 8,
  //           display: "block",
  //         }}
  //       />
  //       <Space>
  //         <Button
  //           type="primary"
  //           onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
  //           icon={<SearchOutlined />}
  //           size="small"
  //           style={{
  //             width: 90,
  //           }}
  //         >
  //           Search
  //         </Button>
  //         <Button
  //           onClick={() => clearFilters && handleReset(clearFilters)}
  //           size="small"
  //           style={{
  //             width: 90,
  //           }}
  //         >
  //           Reset
  //         </Button>
  //         <Button
  //           type="link"
  //           size="small"
  //           onClick={() => {
  //             confirm({
  //               closeDropdown: false,
  //             });
  //             setSearchText(selectedKeys[0]);
  //             setSearchedColumn(dataIndex);
  //           }}
  //         >
  //           Filter
  //         </Button>
  //       </Space>
  //     </div>
  //   ),
  //   filterIcon: (filtered) => (
  //     <SearchOutlined
  //       style={{
  //         color: filtered ? "#1890ff" : undefined,
  //       }}
  //     />
  //   ),
  //   onFilter: (value, record) =>
  //     record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
  //   onFilterDropdownVisibleChange: (visible) => {
  //     if (visible) {
  //       setTimeout(() => searchInput.current?.select(), 100);
  //     }
  //   },
  //   render: (text) =>
  //     searchedColumn === dataIndex ? (
  //       <Highlighter
  //         highlightStyle={{
  //           backgroundColor: "#ffc069",
  //           padding: 0,
  //         }}
  //         searchWords={[searchText]}
  //         autoEscape
  //         textToHighlight={text ? text.toString() : ""}
  //       />
  //     ) : (
  //       text
  //     ),
  // });

  return (
    <>
      <DataTableExtensions {...tableData} print={false} export={false}>
        <DataTable
          selectableRowsVisibleOnly
          // onRowClicked={(e) =>
          //   (window.location.href = `/deal_intelligence/${e._id}`)
          // }
          conditionalRowStyles={conditionalRowStyles}
          expandableRowExpanded
          noHeader
          defaultSortField="closedate"
          defaultSortAsc={false}
          pagination
          highlightOnHover
          customStyles={customStyles}
        />
      </DataTableExtensions>
      {/* <Table
        columns={[
          {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: '30%',
            ...getColumnSearchProps('name'),
          },
          {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
            width: '20%',
            ...getColumnSearchProps('age'),
          },
          {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
            ...getColumnSearchProps('address'),
            sorter: (a, b) => a.address.length - b.address.length,
            sortDirections: ['descend', 'ascend'],
          },
        ]} dataSource={[
          {
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
          },
        ]} /> */}
    </>
  );
};

export default DataTables;
