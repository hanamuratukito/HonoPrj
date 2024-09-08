import { createRoot } from "react-dom/client";
import { useState, useEffect, useRef } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Checkbox from "@mui/material/Checkbox";
import InputLabel from "@mui/material/InputLabel";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Pagination from "@mui/material/Pagination";
import Grid from "@mui/material/Grid";
import { ResItem } from "./index";
import { v4 as uuid } from "uuid";

const PREFECTURES = [
  { key: "選択無し", value: "-01" },
  { key: "北海道", value: "01" },
  { key: "青森県", value: "02" },
  { key: "岩手県", value: "03" },
  { key: "宮城県", value: "04" },
  { key: "秋田県", value: "05" },
  { key: "山形県", value: "06" },
  { key: "福島県", value: "07" },
  { key: "茨城県", value: "08" },
  { key: "栃木県", value: "09" },
  { key: "群馬県", value: "10" },
  { key: "埼玉県", value: "11" },
  { key: "千葉県", value: "12" },
  { key: "東京都", value: "13" },
  { key: "神奈川県", value: "14" },
  { key: "新潟県", value: "15" },
  { key: "富山県", value: "16" },
  { key: "石川県", value: "17" },
  { key: "福井県", value: "18" },
  { key: "山梨県", value: "19" },
  { key: "長野県", value: "20" },
  { key: "岐阜県", value: "21" },
  { key: "静岡県", value: "22" },
  { key: "愛知県", value: "23" },
  { key: "三重県", value: "24" },
  { key: "滋賀県", value: "25" },
  { key: "京都府", value: "26" },
  { key: "大阪府", value: "27" },
  { key: "兵庫県", value: "28" },
  { key: "奈良県", value: "29" },
  { key: "和歌山県", value: "30" },
  { key: "鳥取県", value: "31" },
  { key: "島根県", value: "32" },
  { key: "岡山県", value: "33" },
  { key: "広島県", value: "34" },
  { key: "山口県", value: "35" },
  { key: "徳島県", value: "36" },
  { key: "香川県", value: "37" },
  { key: "愛媛県", value: "38" },
  { key: "高知県", value: "39" },
  { key: "福岡県", value: "40" },
  { key: "佐賀県", value: "41" },
  { key: "長崎県", value: "42" },
  { key: "熊本県", value: "43" },
  { key: "大分県", value: "44" },
  { key: "宮崎県", value: "45" },
  { key: "鹿児島県", value: "46" },
  { key: "沖縄県", value: "47" },
];

const SCHOOL_TYPE = [
  { key: "選択無し", value: "-01" },
  { key: "幼稚園", value: "A1" },
  { key: "幼保連携型認定こども園", value: "A2" },
  { key: "小学校", value: "B1" },
  { key: "中学校", value: "C1" },
  { key: "義務教育学校", value: "C2" },
  { key: "高等学校", value: "D1" },
  { key: "中等教育学校", value: "D2" },
  { key: "特別支援学校", value: "E1" },
  { key: "大学", value: "F1" },
  { key: "短期大学", value: "F2" },
  { key: "高等専門学校", value: "G1" },
  { key: "専修学校", value: "H1" },
  { key: "各種学校", value: "H2" },
];

const SCHOOL_FOUNDER = [
  { key: "国立", value: "1" },
  { key: "公立", value: "2" },
];

const SCHOOL_STATUS = [
  { key: "本校", value: "1" },
  { key: "分校", value: "2" },
  { key: "廃坑", value: "9" },
];

const App = () => {
  const [schoolList, setSchoolList] = useState<ResItem>({
    data: [],
    current_page: 1,
    total: 0,
    per_page: 100,
  });

  const SchoolTable = (props: { list: ResItem }) => {
    const { list } = props;

    interface Column {
      id: "name" | "zipCode" | "prefCode" | "address" | "founder" | "status";
      label: string;
      minWidth?: number;
      align?: "right";
      format?: (value: number) => string;
    }
    const columns: readonly Column[] = [
      { id: "name", label: "学校名", minWidth: 170 },
      { id: "zipCode", label: "郵便番号", minWidth: 100 },
      {
        id: "prefCode",
        label: "都道府県",
        minWidth: 170,
      },
      {
        id: "address",
        label: "所在地",
        minWidth: 170,
      },
      {
        id: "founder",
        label: "国立・私立",
        minWidth: 170,
      },
      {
        id: "status",
        label: "本校・分校",
        minWidth: 170,
      },
    ];

    interface Data {
      name: string;
      zipCode: string;
      prefCode: string;
      address: string;
      founder: string;
      status: string;
    }

    const createData = (
      name: string,
      zipCode: string,
      prefCode: string,
      address: string,
      founder: string,
      status: string
    ): Data => {
      return { name, zipCode, prefCode, address, founder, status };
    };

    const rows = list.data.map((l) =>
      createData(
        l.school_name,
        l.zip_code,
        l.pref,
        l.school_locate_at,
        l.school_founder,
        l.school_status
      )
    );
    const page = useRef(list.current_page);

    const handleChangePage = async (newPage: number) => {
      let query = "";
      if (prefCode !== "-01") {
        query += `pref_code=${prefCode}&`;
      }
      if (zipCode !== "") {
        query += `zip_code=${zipCode}&`;
      }
      if (schoolType !== "-01") {
        query += `school_type_code=${schoolType}&`;
      }
      if (schoolFounderCodes.length > 0) {
        query += `school_founder_code=${schoolFounderCodes.join(",")}&`;
      }
      if (schoolStatusCodes.length > 0) {
        query += `school_status_code=${schoolStatusCodes.join(",")}&`;
      }
      if (keyword !== "") {
        query += `keyword=${keyword}&`;
      }
      query += `page=${newPage}`;
      const response = await fetch(`/api/getSchool?${query}`);
      const data = (await response.json()) as ResItem;
      setSchoolList(data);
    };

    return (
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={uuid()}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <Pagination
          count={Math.ceil(list.total / list.per_page)}
          page={page.current}
          onChange={(_, newPage) => handleChangePage(newPage)}
        />
      </Paper>
    );
  };

  const [prefCode, setPrefCode] = useState("-01");
  const [zipCode, setZipCode] = useState("");
  const [schoolType, setSchoolType] = useState("-01");
  const [schoolFounderCodes, setStateSchoolFounderCodes] = useState<string[]>(
    []
  );
  const [schoolStatusCodes, setSchoolStatusCodes] = useState<string[]>([]);
  const [keyword, setKeyword] = useState("");

  const handleChangeFounder = (code: string) => {
    if (schoolFounderCodes.includes(code)) {
      setStateSchoolFounderCodes(schoolFounderCodes.filter((c) => c !== code));
    } else {
      setStateSchoolFounderCodes([...schoolFounderCodes, code]);
    }
  };

  const handleChangeStatus = (code: string) => {
    if (schoolStatusCodes.includes(code)) {
      setSchoolStatusCodes(schoolStatusCodes.filter((c) => c !== code));
    } else {
      setSchoolStatusCodes([...schoolStatusCodes, code]);
    }
  };

  const handleSearchSchool = async () => {
    let query = "";
    if (prefCode !== "-01") {
      query += `pref_code=${prefCode}&`;
    }
    if (zipCode !== "") {
      query += `zip_code=${zipCode}&`;
    }
    if (schoolType !== "-01") {
      query += `school_type_code=${schoolType}&`;
    }
    if (schoolFounderCodes.length > 0) {
      query += `school_founder_code=${schoolFounderCodes.join(",")}&`;
    }
    if (schoolStatusCodes.length > 0) {
      query += `school_status_code=${schoolStatusCodes.join(",")}&`;
    }
    if (keyword !== "") {
      query += `keyword=${keyword}&`;
    }
    if (query.endsWith("&")) {
      query = query.slice(0, -1);
    }
    const response = await fetch(`/api/getSchool?${query}`);
    const data = (await response.json()) as ResItem;
    setSchoolList(data);
  };

  useEffect(() => {
    handleSearchSchool();
  }, []);

  return (
    <div className="mb-5">
      <Typography variant="h2" component="h1">
        学校検索
      </Typography>
      <Box component={Paper} p={2} my={2}>
        <Box
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSearchSchool();
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <FormControl>
                <InputLabel id="prefectures-select-label">都道府県</InputLabel>
                <Select
                  labelId="prefectures-select-label"
                  id="prefectures-select"
                  label="都道府県"
                  value={prefCode}
                  onChange={(e) => setPrefCode(e.target.value)}
                >
                  {PREFECTURES.map((pref) => (
                    <MenuItem key={`pref-${pref.value}`} value={pref.value}>
                      {pref.key}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="郵便番号"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
              />
            </Grid>
            <Grid item xs={4}>
              <FormControl>
                <InputLabel id="school-type-select-label">
                  学校の種別
                </InputLabel>
                <Select
                  labelId="school-type-select-label"
                  id="school-type-select"
                  label="学校の種別"
                  value={schoolType}
                  onChange={(e) => setSchoolType(e.target.value)}
                >
                  {SCHOOL_TYPE.map((type) => (
                    <MenuItem key={`type-${type.value}`} value={type.value}>
                      {type.key}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="キーワード"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
            </Grid>
            <Grid item xs={4}>
              <FormControl
                sx={{ m: 3 }}
                component="fieldset"
                variant="standard"
              >
                <FormLabel component="legend">国立私立</FormLabel>
                <FormGroup>
                  {SCHOOL_FOUNDER.map((founder) => (
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={schoolFounderCodes.includes(founder.value)}
                          onChange={(event) =>
                            handleChangeFounder(event.target.value)
                          }
                          value={founder.value}
                        />
                      }
                      label={founder.key}
                    />
                  ))}
                </FormGroup>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl
                sx={{ m: 3 }}
                component="fieldset"
                variant="standard"
              >
                <FormLabel component="legend">本校分校</FormLabel>
                <FormGroup>
                  {SCHOOL_STATUS.map((founder) => (
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={schoolStatusCodes.includes(founder.value)}
                          onChange={(event) =>
                            handleChangeStatus(event.target.value)
                          }
                          value={founder.value}
                        />
                      }
                      label={founder.key}
                    />
                  ))}
                </FormGroup>
              </FormControl>
            </Grid>
          </Grid>
          <Box display="flex" mt={2}>
            <Button variant="contained" onClick={handleSearchSchool}>
              検索
            </Button>
          </Box>
        </Box>
      </Box>
      <SchoolTable list={schoolList} />
    </div>
  );
};

const domNode = document.getElementById("root")!;
const root = createRoot(domNode);
root.render(<App />);
