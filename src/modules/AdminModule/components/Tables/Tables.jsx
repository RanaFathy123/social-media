import React from "react";
import Breadcrumb from "../../../../components/Breadcrumbs/Breadcrumb";
import TableThree from "../../../../components/Tables/TableThree";
import Tabs from "../../../../components/Tabs/Tabs";

const Tables = () => {
  return (
    <>
      <Breadcrumb pageName="Tables" />

      <div className="flex flex-col gap-10">
        <Tabs />
      </div>
    </>
  );
};

export default Tables;
