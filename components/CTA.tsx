import ContactUs from "./ContactUs";

const CTA = ({ title }: { title: string }) => {
  return (
    <section className="container mx-auto px-4 ">
      <div className="px-3 bg-[#140405CC] rounded-2xl min-h-[180px] h-[180px] max-md:flex-col  max-md:gap-x-4 flex justify-center items-center gap-3">
        <p className=" text-white text-xl font-semibold tracking-wider">
          {title}
        </p>
        <ContactUs />
      </div>
    </section>
  );
};

export default CTA;
