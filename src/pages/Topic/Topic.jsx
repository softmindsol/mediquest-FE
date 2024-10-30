import React, { useEffect, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { IoSearchSharp } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { SlArrowRight } from "react-icons/sl";
import { useDispatch, useSelector } from "react-redux";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import CreateQuizModal from "../../components/CreateQuizModal";
import DefaultLayout from "../../layouts/DefaultLayout";
import RecentTest from "./RecentTest";
import { categoryItems } from "./Topic-constant";
import DotsLoader from "../../components/Loader/dots-loader";
import { getCurrentUser } from "../../store/features/auth/auth.service";

const universityNames = categoryItems.map((item) => item.name);

const Topic = () => {
  const { subjectQuestions = [], user = {} } = useSelector(
    (state) => state?.user?.selectedUser
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (!user?.id) {
      dispatch(getCurrentUser());
    }
  }, [dispatch]);
  const userType = user?.userType?.plan === "FREE";
  console.log("🚀 ~ Topic ~ userType:", userType);
  const [isModalOpen, setModalOpen] = useState(false);
  const [formdata, setFormData] = useState({
    name: "",
    mode: "Tutor",
    questionCount: 10,
    university: user?.university || "",
  });
  const [formErrors, setFormErrors] = useState({
    name: "",
    subjects: "",
    university: "",
  });

  const openModal = () => {
    // Validate before opening modal
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      setModalOpen(true);
    } else {
      setFormErrors(errors);
    }
  };

  const closeModal = () => setModalOpen(false);
  const [expandedCategories, setExpandedCategories] = useState([]);

  useEffect(() => {
    if (user?.university) {
      setSelectedCategories([user.university]);
      setFormData((prev) => ({
        ...prev,
        university: user.university,
      }));
    }
  }, [user?.university]);

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const validateForm = () => {
    const errors = {};

    if (!formdata.name.trim()) {
      errors.name = "Quiz name is required";
    } else if (formdata.name.length < 3) {
      errors.name = "Quiz name must be at least 3 characters";
    }

    if (selectedLeftCategories.length === 0) {
      errors.subjects = "Please select at least one subject";
    }

    if (selectedCategories.length === 0) {
      errors.university = "Please select at least one university";
    }

    return errors;
  };

  const togleCategory = (category) => {
    if (userType) return;

    if (selectedCategories.includes(category)) {
      setSelectedCategories(
        selectedCategories.filter((item) => item !== category)
      );
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
    setFormErrors((prev) => ({ ...prev, university: "" }));
  };

  const [visibleItems, setVisibleItems] = useState(4);
  const loadMoreItems = () => {
    setVisibleItems((prevVisibleItems) => prevVisibleItems + 2);
  };

  const removeCategory = (category) => {
    if (userType) return;
    setSelectedCategories(
      selectedCategories.filter((item) => item !== category)
    );
  };

  const filteredCategories = universityNames.filter((category) =>
    category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [selectedLeftCategories, setSelectedLeftCategories] = useState([]);
  const [selectedLeftSubcategories, setSelectedLeftSubcategories] = useState(
    {}
  );

  const handleLeftCategoryCheckbox = (category, index) => {
    const updatedSubcategories = { ...selectedLeftSubcategories };

    if (selectedLeftCategories.includes(index)) {
      // Uncheck category and all its subcategories
      setSelectedLeftCategories(
        selectedLeftCategories.filter((i) => i !== index)
      );
      delete updatedSubcategories[index];
    } else {
      // Check category and all its subcategories
      setSelectedLeftCategories([...selectedLeftCategories, index]);
      updatedSubcategories[index] = category.schools.map((sub) => sub.school);
    }

    setSelectedLeftSubcategories(updatedSubcategories);
    setFormErrors((prev) => ({ ...prev, subjects: "" }));
  };

  const handleLeftSubcategoryCheckbox = (categoryIndex, subcategoryName) => {
    const updatedSubcategories = { ...selectedLeftSubcategories };

    if (!updatedSubcategories[categoryIndex]) {
      updatedSubcategories[categoryIndex] = [];
    }

    if (updatedSubcategories[categoryIndex]?.includes(subcategoryName)) {
      // Remove subcategory
      updatedSubcategories[categoryIndex] = updatedSubcategories[
        categoryIndex
      ].filter((name) => name !== subcategoryName);

      // If no subcategories remain, uncheck the parent category
      if (updatedSubcategories[categoryIndex].length === 0) {
        delete updatedSubcategories[categoryIndex];
        setSelectedLeftCategories(
          selectedLeftCategories.filter((i) => i !== categoryIndex)
        );
      }
    } else {
      // Add subcategory and ensure parent category is checked
      updatedSubcategories[categoryIndex].push(subcategoryName);
      if (!selectedLeftCategories.includes(categoryIndex)) {
        setSelectedLeftCategories([...selectedLeftCategories, categoryIndex]);
      }
    }

    setSelectedLeftSubcategories(updatedSubcategories);
    setFormErrors((prev) => ({ ...prev, subjects: "" }));
  };

  const toggleCategory = (index) => {
    if (expandedCategories.includes(index)) {
      setExpandedCategories(expandedCategories.filter((i) => i !== index));
    } else {
      setExpandedCategories([...expandedCategories, index]);
    }
  };

  const subjects = selectedLeftCategories.map((index) => ({
    name: subjectQuestions[index].subjectName,
    city: selectedLeftSubcategories[index] || [],
  }));

  const values = {
    name: formdata.name,
    university: formdata.university,
    mode: formdata.mode,
    questionCount: formdata.questionCount,
    subject: subjects,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();

    if (Object.keys(errors).length === 0) {
      console.log("Form submitted:", values);
      openModal();
    } else {
      setFormErrors(errors);
    }
  };

  const [showUniversities, setShowUniversities] = useState(false);

  const handleToggle = () => {
    if (userType) return;
    setShowUniversities(!showUniversities);
  };

  const handleQuizNameChange = (e) => {
    const value = e.target.value;
    setFormData({ ...formdata, name: value });
    if (value.trim()) {
      setFormErrors((prev) => ({ ...prev, name: "" }));
    }
  };

  return (
    <DefaultLayout>
      <div className="">
        <Breadcrumb pageName="Topics" />

        <div className="mb-13">
          <p className="text-[14px] text-black-2 font-medium">
            Welcome to the Question Bank.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-9">
            <form onSubmit={handleSubmit} className="p-4 bg-white rounded-lg">
              <div className="flex flex-wrap justify-start gap-3 lg:gap-15">
                <div>
                  <label
                    htmlFor="noOfQuestions"
                    className="block text-[14px] font-semibold text-[#111827]"
                  >
                    Quiz Name
                  </label>
                  <input
                    type="text"
                    placeholder="Create a test name"
                    value={formdata.name}
                    onChange={handleQuizNameChange}
                    className={`mt-1 px-4 py-2 text-[#ADB5BD] text-title-p focus:outline-none rounded-[4px] border ${
                      formErrors.name ? "border-red-500" : "border-[#CED4DA]"
                    } placeholder-secondary`}
                  />
                  {formErrors.name && (
                    <p className="mt-1 text-sm text-red-500">
                      {formErrors.name}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="noOfQuestions"
                    className="block text-[14px] font-semibold text-[#111827]"
                  >
                    No. of questions
                  </label>
                  <select
                    value={formdata.questionCount}
                    onChange={(e) =>
                      setFormData({
                        ...formdata,
                        questionCount: e.target.value,
                      })
                    }
                    className="mt-1 px-4 py-2 text-[#ADB5BD] text-title-p focus:outline-none rounded-[4px] border border-[#CED4DA] placeholder-secondary bg-white w-50"
                  >
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="30">30</option>
                    <option value="40">40</option>
                    <option value="50">50</option>
                  </select>
                </div>
              </div>
              <div className="flex items-center justify-end mb-2">
                <div>
                  <button
                    type="submit"
                    className="bg-[#007AFF] text-[12px] flex items-center gap-3 font-semibold text-white px-4 py-3 rounded-md"
                  >
                    Create New Quiz
                    <SlArrowRight className="text-white" />
                  </button>
                  <CreateQuizModal
                    values={values}
                    isOpen={isModalOpen}
                    closeModal={closeModal}
                  />
                </div>
              </div>
            </form>

            <div className="bg-white rounded-lg border border-[#E6E9EC]">
              <div className="flex justify-between items-center p-4 border-b border-[#DEE2E6]">
                <h2 className="font-semibold text-title-sm text-primary">
                  Categories - {user?.year?.replace(/(\D)(\d)/, "$1 $2") || ""}
                </h2>
                <h2 className="text-[13px] text-primary font-bold">
                  Attempted
                </h2>
              </div>

              {formErrors.subjects && (
                <p className="text-red-500 text-sm p-4 border-b border-[#DEE2E6]">
                  {formErrors.subjects}
                </p>
              )}

              <div className="grid gap-3">
                {subjectQuestions && subjectQuestions.length > 0 ? (
                  subjectQuestions?.map((category, index) => (
                    <div key={index}>
                      <div className="flex justify-between items-center border-b border-[#DEE2E6] py-2 px-4">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            className="w-4 h-4 mr-3 cursor-pointer"
                            checked={selectedLeftCategories.includes(index)}
                            onChange={() =>
                              handleLeftCategoryCheckbox(category, index)
                            }
                          />
                          <span className="text-[14px] text-primary">
                            {category?.subjectName}
                          </span>
                          <span
                            className="cursor-pointer text-[10px] bg-[#EBEEFD] p-1 text-[#3A57E8] border border-[#3A57E8] ml-3"
                            onClick={() => toggleCategory(index)}
                          >
                            {expandedCategories.includes(index) ? (
                              <FaMinus />
                            ) : (
                              <FaPlus />
                            )}
                          </span>
                        </div>
                        <span className="text-white text-[10px] font-semibold bg-[#007AFF] px-2 py-1 rounded-md">
                          1 of {category?.totalQuestions}
                        </span>
                      </div>
                      {expandedCategories.includes(index) &&
                        category?.schools && (
                          <div>
                            {category?.schools?.map((subcategory, subIndex) => (
                              <div
                                key={subIndex}
                                className="flex justify-between items-center pl-12 py-2 px-4 border-b border-[#DEE2E6]"
                              >
                                <div className="flex items-center">
                                  <input
                                    type="checkbox"
                                    className="mr-3 cursor-pointer"
                                    checked={
                                      selectedLeftSubcategories[
                                        index
                                      ]?.includes(subcategory?.school) || false
                                    }
                                    onChange={() =>
                                      handleLeftSubcategoryCheckbox(
                                        index,
                                        subcategory?.school
                                      )
                                    }
                                  />
                                  <span className="text-[14px] text-primary">
                                    {subcategory.school}
                                  </span>
                                </div>
                                <span className="text-white text-[10px] font-semibold bg-[#007AFF] px-2 py-1 rounded-md">
                                  1 of {subcategory?.count}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                    </div>
                  ))
                ) : (
                  <div className="flex justify-center py-8">
                    <DotsLoader />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-lg border border-[#E6E9EC]">
              <h2 className="text-title-sm text-primary font-semibold border-b border-[#E9ECEF] px-6 py-5">
                Test Mode
              </h2>
              <div className="grid grid-cols-2 px-4 py-6">
                <div className="flex items-center">
                  <input
                    type="radio"
                    disabled={userType}
                    name="mode"
                    value="Timed"
                    checked={formdata.mode === "Timed"}
                    onChange={(e) =>
                      setFormData({ ...formdata, mode: e.target.value })
                    }
                    className="w-[16px] h-[16px] mr-2"
                  />
                  <label className="text-[15px] font-medium text-primary">
                    Timed
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="mode"
                    value="Tutor"
                    checked={formdata.mode === "Tutor"}
                    onChange={(e) =>
                      setFormData({ ...formdata, mode: e.target.value })
                    }
                    className="w-[16px] h-[16px] mr-2"
                  />
                  <label className="text-[15px] font-medium text-primary">
                    Tutor
                  </label>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-[#E6E9EC]">
              <h2 className="text-title-sm text-primary font-semibold border-b border-[#DEE2E6] px-6 py-4">
                University
              </h2>
              <div className="flex items-center flex-wrap border-b border-[#DEE2E6] px-7 ">
                {selectedCategories.map((category, index) => (
                  <div
                    key={index}
                    className="bg-[#E5E6E6] flex items-center px-3 py-1 rounded-lg mr-6 my-2"
                  >
                    <span className="text-[14px]">{category}</span>
                    <button
                      className="ml-2"
                      onClick={() => removeCategory(category)}
                    >
                      <RxCross2 />
                    </button>
                  </div>
                ))}
              </div>
              <div className="relative  cursor-pointer border m-4 rounded border-[#9DA2AC]">
                <input
                  type="text"
                  onClick={handleToggle}
                  placeholder="Search"
                  className="w-full px-7 cursor-pointer py-2  rounded-md focus:outline-none placeholder-secondary"
                  value={searchTerm}
                  disabled={userType}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <span className="absolute transform -translate-y-1/2 right-3 top-1/2 text-secondary">
                  <IoSearchSharp size={17} className="text-secondary" />
                </span>
              </div>

              {showUniversities && (
                <div className="space-y-2">
                  {filteredCategories
                    .slice(0, visibleItems)
                    .map((category, index) => (
                      <div
                        key={index}
                        className="flex items-center px-4 py-3 border-b border-[#DEE2E6]"
                      >
                        <input
                          type="checkbox"
                          className="mr-2"
                          checked={selectedCategories.includes(category)}
                          onChange={() => togleCategory(category)}
                        />
                        <label className="text-[14px] text-primary">
                          {category}
                        </label>
                      </div>
                    ))}

                  {visibleItems < filteredCategories.length && (
                    <div className="py-3 pl-4 text-left">
                      <button
                        onClick={loadMoreItems}
                        className="bg-[#007AFF] text-[14px]  font-semibold text-white px-4 py-2 rounded-md"
                      >
                        Load More
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
            <h2 className="font-semibold text-title-sm text-primary">
              Recent Tests
            </h2>

            <RecentTest />
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Topic;
