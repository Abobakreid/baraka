import ContactUs from "./ContactUs";

const HeroHeader = () => {
  return (
    <div className="text-center flex flex-col gap-4 py-5 justify-center items-center">
      <h2 className="text-[clamp(1.6rem,2cqw,6rem)] text-[#1E1F24] font-bold  custom-shadow">
        بركة اوتو كير <br />
        وجهتك الاولي لفحص وصيانة سيارتك
      </h2>
      <p className="text-xl text-[#43444A] tracking-wide">
        احجز الآن خدمتك المثالية للفحص والصيانة، واستمتع براحة البال والأمان على
        الطريق.
      </p>
      <ContactUs />
    </div>
  );
};

export default HeroHeader;
