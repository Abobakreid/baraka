/* eslint-disable @typescript-eslint/no-explicit-any */
import { workCardsColors } from "@/constants";
import { Control, ControllerRenderProps, FieldValues } from "react-hook-form";
import { InputType } from "./enums";

export type WorkCardColorKey = keyof typeof workCardsColors;

export type AutoPartsSearchParams = {
  page: string;
  limit: string;
  search: string;
  category: string;
};
export type OilsSearchParams = {
  page: string;
  limit: string;
  search: string;
  brand: string;
  priceRange: string;
};
export type OurWorkSearchParams = {
  page: string;
  limit: string;
};
export type AllWorksProps = {
  page: number;
  limit: number;
  totalPages: number;
  data: {
    image: string;
    title: string;
    description: string;
    whatWeDid: {
      text: string;
      colors: string;
    }[];
  }[];
};
export type CarouselsProps = {
  children: React.ReactNode;
  previousClassName: string;
  nextClassName: string;
  dir: string;
  className?: string;
  carouselStyle?: string;
  containerStyle?: string;
};
export type ReviewCardProps = {
  card: {
    image: string;
    name: string;
    modification: string;
    review: string;
  };
};

export type CustomInputProps = {
  name: string;
  label?: string;
  type: string;
  inputType: InputType;
  children?: React.ReactNode;
  placeholder: string;
  inputClassName?: string;
  control: Control<any>;
};

export type DetailsProps = {
  product: {
    id: string;
    image: string;
    title: string;
    price: string;
    discountPercentage: string;
    isNew: boolean;
    finished: boolean;
    brand: string;
    Viscosity: string;
    Compatibility: string;
    Advantages: string;
    productType: string;
    cardType: string;
    remain: number;
    sold: number;
    description: string;
    rate: number;
  };
};
export type DiscountProps = {
  value: string;
  className?: string;
};
export type FilterFormProps = {
  price: boolean;
  filterOptions: { label: string; value: string }[];
};
export type FilterFormAccordionProps = {
  control: Control<any>;
  price: boolean;
  error: boolean;
  filterOptions: { label: string; value: string }[];
  handleReset: () => void;
  slideRange: number[] | undefined;
};

export type GlobalHeadProps = {
  headText: string;
  description?: string;
  imageClassName?: string;
};

export type ImplementCardProps = {
  card: {
    num: string;
    title: string;
    des: string;
  };
};
export type WorkCardProps = {
  card: {
    image: string;
    title: string;
    description: string;
    whatWeDid: { text: string; colors: string }[];
  };
  ImageClassName?: string;
  ContainerClassName?: string;
};
export type MainSectionListProps = {
  className?: string;
  listItem: {
    title: string;
    list: { text: string }[];
  };
};
export type NavAccordionProps = {
  active: boolean;
  subLinks: { route: string; label: string }[];
  handelClose?: () => void;
};
export type OfferCardProps = {
  card: {
    image: string;
    head: string;
    price: string;
    discountPercentage: string;
    isNew: boolean;
    sold: boolean;
  };
};
export type FilterCardProps = {
  card: {
    id?: string;
    image: string;
    title: string;
    price: string;
    discountPercentage: string;
    isNew: boolean;
    sold?: number;
    cardType: string;
    finished: boolean;
  };
};
export type PaginationsProps = {
  total_pages: number;
  page: number;
  limit: number;
};
export type RenderInputProps = {
  type: string;
  inputType: InputType;
  placeholder: string;
  field: ControllerRenderProps<FieldValues>;
  child?: React.ReactNode;
  className?: string;
};
export type ServiceCardProps = {
  serviceData: { image: string; head: string; route: string };
};
export type SocialProofProps = {
  text: string;
  proofCard: { text: string; image: string }[];
  className?: string;
  cardClassName?: string;
};
export type VideoSectionProps = {
  title: string;
  description: string;
  videoSrc: string;
  contact?: boolean;
};
export type WhyUsCardProps = {
  cardData: { image: string; head: string; paragraph: string };
};
export type PaginationProductSideProps = {
  price: boolean;
  page: number;
  limit: number;
  totalPages: number;
  filterOptions: { label: string; value: string }[];
  data: {
    id?: string;
    image: string;
    title: string;
    type?: string;
    price: string;
    discountPercentage: string;
    isNew: boolean;
    sold?: number;
    cardType: string;
    finished: boolean;
  }[];
};
