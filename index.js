const path = require('path');
const dotenv = require('dotenv').config();
app.use(express.json());
app.use(
    express.urlencoded({
      extended: true,
    }),
);
app.use(cors({
    origin:'*'
}));
app.use(express.static('public'));
route(app);
const node_port = process.env.PORT;
app.listen(node_port, () => {
    console.log(`Server Started at ${node_port}`)
})