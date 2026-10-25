import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import TasksList from "./pages/tasks/List";
import useCrud from "./hooks/useCrud";
import EditTask from "./pages/tasks/Edit";
import CreateTask from "./pages/tasks/Create";
import NotFound from "./pages/NotFound";

export default function App() {
    // El estado vive aquí: App no se desmonta al navegar.
    const tasks = useCrud("/data/tasks.json");
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                {/* Ruta con parámetros */}
                <Route path="tasks">
                    <Route
                        index
                        element={
                            <TasksList
                                items={tasks.items}
                                onDelete={tasks.remove}
                            />
                        }
                    />
                    <Route path="create" element={ <CreateTask onCreate={tasks.create} /> } />
                    <Route path="edit/:id" element={
                        <EditTask
                            items={tasks.items}
                            loading={tasks.loading}
                            onUpdate={tasks.update}
                        />
                    } />
                </Route>

                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    );
}
