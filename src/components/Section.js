import React, { memo } from "react";
import { SectionItem } from "./";

const Section = ({ data }) => {
  return (
    <div className="mt-10 px-[44px] flex flex-col gap-1">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-[20px] px-4">{data?.title}</h3>
        <span className="text-xs">TẤT CẢ</span>
      </div>
      <div className="flex items-start justify-betweenf]">
        {data &&
          data?.items
            ?.slice(0, 5)
            .map((item) => (
              <SectionItem key={item.encodeId} item={item} data={data} />
            ))}
      </div>
    </div>
  );
};

export default memo(Section);
