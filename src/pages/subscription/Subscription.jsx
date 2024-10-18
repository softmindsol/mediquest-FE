import { useState } from "react";
import { Description, Dialog, Radio, RadioGroup } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { HiMiniCheckBadge } from "react-icons/hi2";
import CancellationPolicy from "../../components/CancellationPolicy";

const pricing = {
  frequencies: [
    { value: "monthly", label: "Monthly", priceSuffix: "/month" },
    { value: "yearly", label: "Yearly", priceSuffix: "/year" },
  ],
  tiers: [
    {
      name: "Compare plans",
      Description: "Choose your plan according to your needs",
      id: "tier-comparison",
      features: [
        { name: "Number of Questions" },
        { name: "Monthly Test Creation" },
        { name: "Performance Analytics" },
        { name: "Timed Test Mode" },
        { name: "University-Specific Questions" },
        { name: "24/7 customer support" },
      ],
      isComparison: true,
    },
    {
      name: "Free",
      id: "tier-free",
      price: { monthly: "0", yearly: "0" },
      yearlyPriceSuffix: "MAD",
      features: [
        { name: "4000+ Questions" },
        { name: "Up to 10 (100 Qs max per test)" },
        { name: "—" },
        { name: "—" },
        { name: "—" },
        { name: "—" },
      ],
      buttonText: "Already on this plan",
      buttonDisabled: true,
    },
    {
      name: "Basic",
      id: "tier-basic",
      price: { monthly: "169", yearly: "99" },
      yearlyPriceSuffix: "MAD",
      features: [
        {
          name: (
            <>
              <div>40,000+ Questions</div>
              <div style={{ color: "#858BA0" }}>Pages Add-ons on Demand</div>
            </>
          ),
        },
        { name: "Unlimited" },
        {
          name: (
            <>
              <div>General rankings</div>
              <div>Weekly, Monthly, Semester</div>
            </>
          ),
        },
        {
          name: (
            <HiMiniCheckBadge
              size={22}
              style={{ color: "#3A57E8", margin: "auto" }}
            />
          ),
        },
        { name: "—" },
        { name: "—" },
      ],
      buttonText: "Choose This Plan",
      buttonDisabled: false,
    },
    {
      name: "Pro",
      id: "tier-pro",
      price: { monthly: "319", yearly: "199" },
      yearlyPriceSuffix: "MAD",
      features: [
        {
          name: (
            <>
              <div>80,000+ Questions</div>
              <div style={{ color: "#858BA0" }}>Pages Add-ons on Demand</div>
            </>
          ),
        },
        { name: "Unlimited" },
        {
          name: (
            <>
              <div>Rankings by school and topic</div>
              <div>Weekly, Monthly, Semester</div>
            </>
          ),
        },
        {
          name: (
            <HiMiniCheckBadge
              size={22}
              style={{ color: "#3A57E8", margin: "auto" }}
            />
          ),
        },
        {
          name: (
            <HiMiniCheckBadge
              size={22}
              style={{ color: "#3A57E8", margin: "auto" }}
            />
          ),
        },
        {
          name: (
            <HiMiniCheckBadge
              size={22}
              style={{ color: "#3A57E8", margin: "auto" }}
            />
          ),
        },
      ],
      buttonText: "Choose This Plan",
      buttonDisabled: false,
    },
  ],
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Subscription = () => {
  const [frequency, setFrequency] = useState(pricing.frequencies[0]);

  return (
    <>
      <Header />
      <div className="bg-gray-900">
        <main>
          {/* Pricing section */}
          <div className="mx-auto mt-12 max-w-screen-xl px-6 lg:px-8">
            <div className="mx-auto max-w-4xl text-center">
              <h1 className="text-title-lg font-semibold text-[#3A57E8]">
                Choose Your Plan
              </h1>
            </div>

            <div className="mt-7 flex justify-center">
              <fieldset aria-label="Payment frequency">
                <RadioGroup
                  value={frequency}
                  onChange={setFrequency}
                  className="grid grid-cols-2 gap-x-1 border rounded-md border-[#3A57E8]"
                >
                  {pricing.frequencies.map((option) => (
                    <Radio
                      key={option.value}
                      value={option}
                      className="cursor-pointer px-8 py-3 data-[checked]:bg-[#3A57E8] data-[checked]:text-white text-title-p font-semibold text-[#3A57E8]"
                    >
                      {option.label}
                    </Radio>
                  ))}
                </RadioGroup>
              </fieldset>
            </div>

            <div className="max-w-screen-xl mx-auto py-6 my-10 overflow-x-auto">
              <table className="min-w-full border-collapse border border-[#E6E9F5]">
                <thead>
                  <tr>
                    {pricing?.tiers?.map((tier) => (
                      <th
                        key={tier.id}
                        className="bg-gray-200 border border-[#E6E9F5]"
                        style={{
                          width: "calc(100% / " + pricing.tiers.length + ")",
                        }}
                      >
                        <div className="p-8">
                          <div
                            className={classNames(
                              tier.name === "Compare plans"
                                ? "font-bold text-[#3A57E8] lg:text-title-md text-left"
                                : "text-[#3A57E8] font-bold lg:text-[40px] text-center"
                            )}
                          >
                            {tier.name}
                          </div>
                          <div className="text-[#858BA0] text-[14px] font-medium text-left">
                            {tier.Description}
                          </div>
                          {tier.isComparison ? null : (
                            <div>
                              <p className="flex justify-center text-[#858BA0] font-medium items-center gap-2 my-4">
                                <span className="text-[14px]">
                                  {tier.yearlyPriceSuffix}
                                </span>
                                <span className="flex items-start justify-start lg:text-[32px]">
                                  {tier.price[frequency.value]}
                                </span>

                                <span>
                                  {pricing.frequencies[0].priceSuffix}
                                </span>
                              </p>

                              <button
                                className={`mt-2 py-2 px-4 rounded ${
                                  tier.buttonDisabled
                                    ? "bg-[#939393] text-white cursor-not-allowed"
                                    : "bg-[#3A57E8] text-white "
                                }`}
                                disabled={tier.buttonDisabled}
                              >
                                {tier.buttonText}
                              </button>
                            </div>
                          )}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {pricing.tiers[0].features.map((feature, index) => (
                    <tr key={index} className="border border-[#E6E9F5]">
                      {pricing.tiers.map((tier) => (
                        <td
                          key={tier.id}
                          className={classNames(
                            "border font-medium text-[#3A57E8] text border-[#E6E9F5] p-7",
                            tier.name === "Compare plans"
                              ? "font-medium text-[#3A57E8] text-title-xsm text-lest"
                              : "text-[#3A57E8] font-medium text-[14px] text-center"
                          )}
                          style={{
                            width: "calc(100% / " + pricing.tiers.length + ")",
                          }}
                        >
                          {tier.isComparison
                            ? feature.name
                            : tier.features[index].name}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
      <CancellationPolicy />
      <Footer />
    </>
  );
};

export default Subscription;
