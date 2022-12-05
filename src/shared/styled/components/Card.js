import styled from "@emotion/styled";

export const Card = styled(div)((props) => ({
    cursor: "pointer",
    padding: "5px",
    width: "84px",
    background: "white",
    borderRadius: "5px",
    textAlign: "center",
    border: "5px solid white",
}));

// .card .inner {
//     border-radius: 5px;
//     background: #ffffff;
//     padding: 5px;
//     border-radius: 100px 60px / 120px 60px;
//     font-size: 75px;
//     margin: 5px;
//     color: black;
//   }
//   .card-bottom-right,
//   .card-top-left {
//     font-size: 10px;
//     color: white;
//   }
