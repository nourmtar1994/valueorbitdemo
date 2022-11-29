import React, { useState, useEffect } from "react";
import { Input, Select, Space } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import moment from "moment-timezone";
import { FaSearch } from "react-icons/fa";

import Loader from "../Badge/Loader/Loader";

import NoteItem from "./NoteItem";

//styles
import * as classes from "./Notes.module.css";

const { Option } = Select;

const Notes = ({ opportunity }) => {
  const [user, setUser] = useState(null);
  const [notesList, setNotesList] = useState([]);
  const [loading, setloading] = useState(false);
  const [sortBy, setSortBy] = useState("datedesc");
  const [searchWord, setSearchWord] = useState("");
  useEffect(() => {
    setUser(JSON.parse(Cookies.get("VO_USER_AUTH")));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Cookies.get("VO_USER_AUTH")]);

  useEffect(() => {
    opportunity && getNotes();
  }, [user]);

  const getNotes = async () => {
    setloading(true);
    try {
      const { data } = await axios.get(
        "/note/filteredby/?opportunity=" +
          opportunity?._id +
          "&createdby=" +
          user?.originId
      );
      if (data?.success) {
        setNotesList(data?.data);
      }
      setloading(false);
    } catch (error) {
      console.log("error");
      setloading(false);
    }
  };
  const sortRenderer = (data) => {
    // date asc
    if (sortBy === "dateasc") {
      return data.sort(
        (a, b) => moment(a?.createddate) - moment(b?.createddate)
      );
    }
    // date desc
    if (sortBy === "datedesc") {
      return data.sort(
        (a, b) => moment(b?.createddate) - moment(a?.createddate)
      );
    }
    // today
    if (sortBy === "today") {
      return data.filter(
        (item) =>
          moment(item?.createddate).format("ll") === moment().format("ll")
      );
    }

    return data;
  };
  return (
    <>
      <Space className={"bg-white full-width " + classes.actionsHeader}>
        <div>
          <Input
            onChange={(e) => e.target.value === "" && setSearchWord("")}
            onPressEnter={(e) => setSearchWord(e.target.value?.toLowerCase())}
            prefix={<FaSearch className="textDescriptionX2" />}
            allowClear
            size="middle"
            placeholder="Search"
            style={{ width: 150 }}
            className="custom-search"
          />
        </div>
        <div className="right">
          <Select
            style={{ width: 130 }}
            className="custom-select"
            placeholder="Sort By"
            onChange={(e) => setSortBy(e)}
            defaultValue="datedesc"
          >
            <Option value="today">Today</Option>
            <Option value="dateasc">Date Asc</Option>
            <Option value="datedesc">Date Desc</Option>
          </Select>
        </div>
      </Space>
      <div className={classes.notecontainer}>
        {loading ? (
          <Loader />
        ) : (
          <>
            {sortRenderer(notesList)?.map(
              (item, index) =>
                item?.body?.toLowerCase()?.includes(searchWord) && (
                  <NoteItem
                    key={index}
                    note={item}
                    setNotesList={setNotesList}
                    notesList={notesList}
                    searchWord={searchWord}
                  />
                )
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Notes;
