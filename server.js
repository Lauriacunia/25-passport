import express  from "express";
import morgan from "morgan";
import session from "express-session";
import sessionFileStore from "session-file-store";
import apiRoutes from "./src/routes/apiRoutes.js";
const fileStore = sessionFileStore(session);
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(session(
    {
        secret: 'secret',
        resave: true,
        saveUninitialized: true,
        store: new fileStore({
            path: './src/sesiones',
            ttl: 60
        })
    }
));

app.set('views', 'src/views');
app.set('view engine', 'ejs');


/** Routes */
app.use('/', apiRoutes);



const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    }
);