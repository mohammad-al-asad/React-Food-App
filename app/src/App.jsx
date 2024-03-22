import styled from "styled-components";
import FoodBody from "./components/FoodBody";
import { useEffect, useState } from "react";

export const SERVER_URL = "http://localhost:9000";

function App() {
  // States
  const [data, setData] = useState();
  const [error, setError] = useState("");
  const [loadding, setLoadding] = useState(true);
  const [filterData, setFilterData] = useState(null);
  const [selectedBtn, setSelectedBtn] = useState("all");

  const foodType = [
    { name: "All", type: "all" },
    { name: "Dinner", type: "dinner" },
    { name: "Breakfast", type: "breakfast" },
    { name: "Lunch", type: "lunch" },
  ];

  // Fetch Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const respose = await fetch(SERVER_URL);
        const json = await respose.json();
        setData(json);
        setFilterData(json);
        setLoadding(false);
      } catch {
        setError("Unable to fetch data...");
      }
    };
    fetchData();
  }, []);

  // Search Event
  const filterInput = (e) => {
    const searchValue = e.target.value;
    if (searchValue === "") {
      setFilterData(null);
    }
    const filter = data?.filter((food) =>
      food.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilterData(filter);
  };

  // Button Event
  const buttonClick = (type) => {
    setSelectedBtn(type);
    if (type === "all") {
      setFilterData(data);
      return;
    }
    const filter = data?.filter((food) =>
      type.toLowerCase().includes(food.type.toLowerCase())
    );
    setFilterData(filter);
  };

  // Returns
  if (error) return <InitialDiv>{error}</InitialDiv>;
  if (loadding) return <InitialDiv>Lodding....</InitialDiv>;

  return (
    <div>
      <TopBar>
        <div className="menu">
          <div className="img">
            <img src="./logo.svg" alt="logo" />
          </div>
          <input
            onChange={filterInput}
            type="search"
            placeholder="Search Food...."
          />
        </div>
        <div className="btn">
          {foodType.map((item) => (
            <Button
              isSelected={selectedBtn === item.type}
              onClick={() => buttonClick(item.type)}
              key={item.name}
            >
              {item.name}
            </Button>
          ))}
        </div>
      </TopBar>
      <FoodBody data={filterData} />
    </div>
  );
}

export default App;

// Styles
const TopBar = styled.div`
  height: 240px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .menu {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 40px;
    padding: 0 100px;
    input {
      background-color: transparent;
      border: 1px solid red;
      color: white;
      border-radius: 5px;
      height: 40px;
      font-size: 16px;
      padding: 0 10px;
      &::placeholder {
        color: white;
      }
    }
    @media (0 < width < 700px) {
      flex-direction: column;
      align-items: center;
      gap: 20px;
      input {
        width: 285px;
      }
    }
  }

  .btn {
    display: flex;
    gap: 20px;
  }
`;

export const Button = styled.div`
  background-color: #ff4343;
  color: white;
  outline: 1px solid ${({ isSelected }) =>
    isSelected ? "white" : "#ff4343"};
  border-radius: 5px;
  padding: 6px 12px;
  border: none;
  color: white;
  cursor: pointer;
  display: inline;
  &:hover {
    background-color: #f22f2f;
  }
`;

const InitialDiv = styled.div`
  height: 100vh;
  display: grid;
  place-items: center;
  font-size: 30px;
`;
