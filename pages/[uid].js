import React from "react";

const UserIdPage = (props) => {
  return (
    <div>
      <h1>{props.id}</h1>
    </div>
  );
};

export default UserIdPage;

export async function getServerSideProps(context) {
  const { params } = context;

  const userId = params.uid;
  return {
    props: {
      id: "userid-" + userId,
    },
  };
}
