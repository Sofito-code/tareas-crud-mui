import { Route, Routes } from "react-router-dom";

import Layout from "./components/Layout";
import { useCrud } from "./hooks/useCrud";

import Home from "./pages/Home";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

import TasksList from "./pages/tasks/List";
import CreateTask from "./pages/tasks/Create";
import EditTask from "./pages/tasks/Edit";

export default function App() {
    // El estado vive aquí, en el componente que no se desmonta al navegar.
    const tasks = useCrud("/data/tasks.json");
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="about" element={<About />} />

                <Route path="tasks">
                    <Route
                        index
                        element={
                            <TasksList
                                items={tasks.items}
                                loading={tasks.loading}
                                error={tasks.error}
                                onDelete={tasks.remove}
                            />
                        }
                    />
                    <Route
                        path="create"
                        element={<CreateTask onCreate={tasks.create} />}
                    />
                    <Route
                        path="edit/:id"
                        element={
                            <EditTask
                                items={tasks.items}
                                loading={tasks.loading}
                                onUpdate={tasks.update}
                            />
                        }
                    />
                </Route>

                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    );
}
