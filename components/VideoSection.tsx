import { VideoSectionProps } from "@/types";
import ContactUs from "./ContactUs";
import GlobalHead from "./GlobalHead";

const VideoSection = ({
  title,
  description,
  videoSrc,
  contact,
}: VideoSectionProps) => {
  return (
    <section className="container mx-auto p-4 md:mt-14 flex flex-col items-center gap-5">
      <GlobalHead
        headText={title}
        description={description}
        imageClassName="!bottom-0"
      />

      {contact && <ContactUs />}
      <figure>
        <video
          src={videoSrc}
          // autoPlay
          loop
          muted
          controls
          playsInline
          className="w-full rounded-2xl"
        />
        <figcaption className="text-center mt-2 hidden">
          فيديو يعرض خدمات صيانة السيارات في الفيوم
        </figcaption>
      </figure>
    </section>
  );
};

export default VideoSection;
