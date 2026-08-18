import Footer from "./components/Footer.jsx";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import MenuSection from "./components/MenuSection.jsx";
import StorySection from "./components/StorySection.jsx";
import VisitSection from "./components/VisitSection.jsx";
import AdminMessages from "./components/AdminMessages.jsx";
import OrderSection from "./components/OrderSection.jsx";
import AdminOrders from "./components/AdminOrders.jsx";

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <MenuSection />
        <OrderSection />
        <StorySection />
        <VisitSection />
        <AdminMessages />
        <AdminOrders />
      </main>
      <Footer />
    </>
  );
}
