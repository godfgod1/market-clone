import React from "react";
import useSWR from "swr";

export default () => {
  const { data, mutate } = useSWR("https://dogs-api.nomadcoders.workers.dev");
  console.log(data);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <video
        style={{ width: "300px", height: "300px" }}
        src={data?.url}
        autoPlay
      />
      <div>
        <button
          style={{ width: "200px", height: "30px" }}
          onClick={() => mutate({}, true)}
        >
          New Dog
        </button>
        <button
          onClick={() => mutate({ ...data, isLiked: !data.isLiked }, false)}
          style={{
            color: "white",
            width: "200px",
            height: "30px",
            backgroundColor: "blue"
          }}
        >
          {data?.isLiked ? "Liked" : "Unliked"}
        </button>
      </div>
    </div>
  );
};
