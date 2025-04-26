import MaintenanceTabs from "@/components/MaintenanceTabs";
import OverlaySection from "@/components/OverlaySection";
import Services from "@/components/Services";
import { navbarLinks } from "@/constants";
import { redirect } from "next/navigation";
export async function generateStaticParams() {
  const maintenanceLink = navbarLinks.find(
    (link) => link.route === "/car-maintenance"
  );
  return (
    maintenanceLink?.subLinks?.map((item) => ({
      type: item.label,
    })) || []
  );
}

const page = async ({ params }: { params: Promise<{ type: string }> }) => {
  const searchText = (await params).type || "ميكانيكا";

  const validTypes = navbarLinks
    .find((link) => link.route === "/car-maintenance")
    ?.subLinks?.map((item) => item.label);

  if (!validTypes?.includes(decodeURIComponent(searchText))) {
    redirect("/");
  }

  return (
    <main>
      <MaintenanceTabs searchText={searchText} />
      <Services />
      <OverlaySection
        text="صيانة سيارتك بكفاءة واحترافية"
        image={"/overlays/overlay-6.png"}
      />
    </main>
  );
};

export default page;
