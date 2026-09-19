import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home.jsx";
import Projects from "./components/Projects/Projects";
import Experience from "./components/Experience/Experience";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";
import ProjectDetails from "./components/ProjectDetails/ProjectDetails";

function App() {
    const isProjectPage =
        window.location.pathname.startsWith("/projects/");

    if (isProjectPage) {
        return (
            <>
                <ProjectDetails />
                <Footer />
            </>
        );
    }

    return (
        <>
            <Navbar />
            <Home />
            <Projects />
            <Experience />
            <About />
            <Contact />
            <Footer />
        </>
    );
}

export default App;