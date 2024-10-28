import React, { useState } from "react";
import { recentTests } from "./Topic-constant";
import { SlArrowRight } from "react-icons/sl";

const RecentTest = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleAccordion = (index) => {
    setOpenIndex(index === openIndex ? null : index);
  };
  return (
    <div className=" bg-white rounded-lg border border-[#CED4DA]">
      <div className="">
        {recentTests.map((test, index) => (
          <div key={index} className="border-b  border-[#CED4DA] ">
            {/* Accordion Header (Test Name) */}
            <div
              className="text-[14px] text-primary font-semibold cursor-pointer p-4"
              onClick={() => toggleAccordion(index)}
            >
              {test.name}
            </div>

            {/* Accordion Content (Description, Date, Button) */}
            {openIndex === index && (
              <div className="mt-2 p-4 border-t border-[#CED4DA] ">
                {test.description && (
                  <>
                    <div className="flex justify-between">
                      <div className="flex flex-col gap-3">
                        <div className="text-[13px] text-secondary">
                          {test.description}
                        </div>
                        <div className="text-[12px] font-bold text-secondary ">
                          Created: {test.createdDate}
                        </div>
                      </div>
                      <div className="flex items-end">
                        <button className="bg-white text-[#007AFF] flex gap-2 items-center px-4 py-2 border border-[#007AFF] rounded-md ">
                          {test.buttonLabel}
                          <SlArrowRight className="text-[#007AFF]" />
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentTest;
