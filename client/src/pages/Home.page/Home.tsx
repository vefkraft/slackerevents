import EventList from "../../components/EventDetails/event.detail";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-5xl font-bold mb-4 text-blue-600">Welcome to SlackerEvent 🎟️</h1>
      <p className="text-lg text-gray-600 max-w-xl">
      </p>


    <EventList />

    </div>
  );
};

export default Home;
