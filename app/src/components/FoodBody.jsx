import styled from "styled-components";
import { Button, SERVER_URL } from "../App";

function FoodBody({ data }) {
  return (
    <CardContainer>
      <Cards>
        {data?.map((food) => (
          <Card key={food.name}>
            <div className="img">
              <img src={SERVER_URL + food.image} alt="Food" />
            </div>
            <div className="content">
              <div className="info">
                <h3>{food.name}</h3>
                <p>{food.text}</p>
              </div>
              <div className="btn">
              <Button>${food.price.toFixed(2)}</Button>
              </div>
            </div>
          </Card>
        ))}
      </Cards>
    </CardContainer>
  );
}

export default FoodBody;

const CardContainer = styled.div`
  background-image: url("./bg.png");
  min-height: 100vh;
  background-size: cover;
`;
const Cards = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  column-gap: 32px;
  row-gap: 20px;
  padding: 10px;
`;
const Card = styled.div`
  width: 340px;
  height: 167px;
  border: 0.66px solid;

  border-image-source: radial-gradient(
      80.69% 208.78% at 108.28% 112.58%,
      #eabfff 0%,
      rgba(135, 38, 183, 0) 100%
    ),
    radial-gradient(
      80.38% 222.5% at -13.75% -12.36%,
      #98f9ff 0%,
      rgba(255, 255, 255, 0) 100%
    );

  background: url(.png),
    radial-gradient(
      90.16% 143.01% at 15.32% 21.04%,
      rgba(165, 239, 255, 0.2) 0%,
      rgba(110, 191, 244, 0.0447917) 77.08%,
      rgba(70, 144, 213, 0) 100%
    );
  background-blend-mode: overlay, normal;
  backdrop-filter: blur(13.1842px);

  border-radius: 20px;

  display: flex;
  padding: 8px;
  margin-top: 60px;
  
  .content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: end;
    h3 {
      margin-top: 8px;
      font-size: 16px;
      font-weight: 500;
    }
    p {
      margin-top: 4px;
      font-size: 12px;
    }
    .btn{
        margin: 0 10px 15px 0;
    }
  }
`;
