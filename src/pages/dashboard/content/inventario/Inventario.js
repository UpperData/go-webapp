import {useState, useEffect} from "react"
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';

// material
import { Box, Grid, Stack, ButtonGroup, Container, Typography,Alert,  Card, Button, Modal, TextField, Checkbox, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { DataGrid, DataGridProps } from '@mui/x-data-grid';
import { LoadingButton } from '@mui/lab';
import { alpha, styled } from '@mui/material/styles';
import { Link, useLocation } from 'react-router-dom';

// components
import Page from '../../../../components/Page';

import axios from "../../../../auth/fetch"
import Loader from '../../../../components/Loader/Loader';

import { Icon } from '@iconify/react';
import CaretDown from "@iconify/icons-ant-design/caret-down"
import CaretUp from "@iconify/icons-ant-design/caret-up"
import CaretRight from "@iconify/icons-ant-design/caret-right"
import CaretLeft from "@iconify/icons-ant-design/caret-left"
import { getPermissions } from "../../../../utils/getPermissions";
import { useSelector } from "react-redux";

import ExportExcel from "react-export-excel"

const ExcelFile     = ExportExcel.ExcelFile;
const ExcelSheet    = ExportExcel.ExcelSheet;
const ExcelColumn   = ExportExcel.ExcelColumn;

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
    boxShadow: 'none',
    textAlign: 'center',
    padding: theme.spacing(5, 5),
    width: "95%",
    margin: "auto",
    maxWidth: "600px",
    backgroundColor: "#fff",
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

function Inventario() {

    // const [data, setdata]                            = useState(rows);
    const [count, setcount]                             = useState(0);

    const [loading, setloading]                         = useState(true);
    const [search, setsearch]                           = useState(true);
    const [data, setdata]                               = useState(null);

    const [openSaveChanges, setopenSaveChanges]         = useState(false);
    const [sending, setsending]                         = useState(false);

    const [openModalAddItem, setopenModalAddItem]       = useState(false);

    const [alertSuccessMessage, setalertSuccessMessage] = useState("");
    const [alertErrorMessage,   setalertErrorMessage]   = useState("");

    const [typeForm, settypeForm]                       = useState("create");
    const [itemToEdit, setitemToEdit]                   = useState(null);

    // const [editingItemInTable, seteditingItemInTable]   = useState(null);
    const [changeInputStock, setchangeInputStock]       = useState(false);

    const urlGetData        = "/InveTorY/get/ALL";
    const urlNewItem        = "/INVETOry/aricle/new";
    const urlEditItem       = "/InVETOrY/aricLe/EdIT";
    const urlEditItemData   = "/InvEToRY/UpdaTE/ARTICLE";

    // Permissions
    const location                              = useLocation();
    let MenuPermissionList                      = useSelector(state => state.dashboard.menu);
    let permissions                             = getPermissions(location, MenuPermissionList);

    const LoginSchema =     Yup.object().shape({
        name:               Yup.string().required('Debe ingresar un nombre'),  
        description:        Yup.string().required('Debe ingresar una descripción'),
        // existence:          Yup.string().required('Ingrese stock'),
    });

    const formik = useFormik({
        validateOnChange: false,
        initialValues: {
            name:             "",
            description:      "",
            existence:        "",
        },
        validationSchema: LoginSchema,
        onSubmit: async (values, {resetForm}) => {
            try {

                let data = {
                    name:               values.name,
                    description:        values.description
                }

                if(typeForm === "create"){
                    data.existence = values.existence;
                }else{
                    data.id        = itemToEdit.id;
                }

                console.log(data);
                setsending(true);

                axios({
                    method: typeForm === "create" ? "POST" : "PUT",
                    url:    typeForm === "create" ? urlNewItem : urlEditItem,
                    data
                }
                    // config
                ).then((res) => {

                    console.log(res);
                    setsending(false);

                    if(res.data.result){
                        setalertSuccessMessage(res.data.message);
                        resetForm();
                        setopenModalAddItem(false);
                        getList();

                        setTimeout(() => {
                            setalertSuccessMessage("");
                        }, 20000);
                    }

                }).catch((err) => {
                    let fetchError = err;

                    console.error(fetchError);
                    if(fetchError.response){
                        console.log(err.response);
                        setalertErrorMessage(err.response.data.data.message);
                        setTimeout(() => {
                            setalertErrorMessage("");
                        }, 20000);
                        setsending(false);
                    }
                });

            } catch(e) {
                // setformErrors(e);

                /*
                    const config = {
                        onUploadProgress: progressEvent => {
                        let progressData = progress;
                        progressData = (progressEvent.loaded / progressEvent.total) * 100;

                        console.log(progressData);

                        setprogress(progressData);
                        setcount(count + progressData);
                        }
                    }
                */
            }
        }
    });

    const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps, setFieldValue, resetForm } = formik;
    

    const getList = async () => {

        setsearch(true);
        axios.get(urlGetData)
        .then((res) => {

            console.log("---Data---");
            console.log(res);

            settypeForm("create");
            setitemToEdit(null);

            setdata(res);
            setloading(false);

        }).catch((err) => {

            let error = err.response;
            if(error){
                if(error.data){
                    setloading(true);
                }
            }
            
        });
        
    }

    useEffect(async () => {
        if(loading){
            if(search){
                await getList();
            }
        }
    });

    const changeStock = (id, newCount) => {
        if(newCount >= 0){
            setchangeInputStock(true);

            let list        = [...data];
            let item        = list.find(item => item.id === id);
            let index       = list.indexOf(item);
            
            // console.log(list);
            // console.log(index);
            // console.log(list[index]);

            item.existence  = newCount;
            list[index]     = item;


            setdata(list);
            setcount(count * 20);
        }
    }

    const editItem = (data) => {
        console.log("Edit", data);

        setFieldValue("name",           data.article.name);
        setFieldValue("description",    data.article.description);

        settypeForm("edit");
        setitemToEdit(data);
        setopenModalAddItem(true);
    }

    const handleCloseModalAddItem = () => {
        setopenModalAddItem(false);
    }

    const openModal = () => {
        setitemToEdit(null);
        resetForm();
        settypeForm("create");
        setopenModalAddItem(true);
    }

    let columns = [
        // { field: 'id',          headerName: 'ID', width: 70 },
        { 
            editable: false,
            field: 'articleId',     
            headerName: `Nombre`,
            width: 200,
            sortable: false,
            renderCell: (cellValues) => {
                let data = cellValues;
                // console.log(data);
                return  <Button 
                            sx={{
                                fontWeight: 'bold', 
                                mb:0, 
                                justifyContent: "start"
                            }} 
                            fullWidth 
                            variant="body"
                            onClick={() => editItem(data.row)}
                        >
                            {data.row.article.name} &nbsp; <i className="mdi mdi-pencil" />
                        </Button>
            }
        },
        { 
            field: 'existence',    
            headerName: 'Existencia',
            sortable: false,
            width: 200,
            headerAlign: 'center',
            renderCell: (cellValues) => {
                let data = cellValues;
                let count = data.row.existence;
                return  <Grid container alignItems="center">
                            <Grid xs={4} item sx={{px: .5}}>
                                <Button disabled={sending} onClick={() => changeStock(data.row.id, count - 1)} type="button" size="small" sx={{py: 1.5, px: 0, minWidth: 0, width: "100%"}} color="primary" variant="contained">
                                    <Icon icon={CaretLeft} />
                                </Button>
                            </Grid>
                            <Grid xs={4} item>
                                <TextField
                                    hiddenLabel
                                    size='small'
                                    fullWidth
                                    autoComplete="lastname"
                                    type="number"
                                    label=""
                                    InputProps={{
                                        readOnly: true,
                                        style: {textAlign: 'center'}
                                    }}
                                    value={count}
                                />
                            </Grid>
                            <Grid xs={4} item sx={{px: .5}}>
                                <Button disabled={sending} onClick={() => changeStock(data.row.id, count + 1)} type="button" size="small" sx={{py: 1.5, px: 0, minWidth: 0, width: "100%"}} color="primary" variant="contained">
                                    <Icon icon={CaretRight} />
                                </Button>
                            </Grid>
                        </Grid>
            }
        },
        { 
            field: 'price',    
            headerName: 'Precio',
            sortable: false,
            width: 100,
            headerAlign: 'center',
            editable: true,
            type: 'number',
            renderCell: (cellValues) => {
                let data = cellValues;
                let price = data.row.price;
                return <Typography>
                    $ {price}
                </Typography>
            }
        },
        { 
            field: 'minStock',    
            headerName: 'Mínimo',
            sortable: false,
            width: 90,
            headerAlign: 'center',
            editable: true,
            type: 'number',
            renderCell: (cellValues) => {
                let data = cellValues;
                let count = data.row.minStock;
                return <Typography>
                    {count}
                </Typography>
            }

            // valueGetter: ({ value }) => value && Number(value),
            /*
                renderCell: (cellValues) => {
                    let data = cellValues;
                    let count = data.row.minStock;
                    return  <TextField
                                hiddenLabel
                                size='small'
                                fullWidth
                                autoComplete="lastname"
                                type="number"
                                label=""
                                InputProps={{
                                    type: "number",
                                    style: {textAlign: 'center'}
                                }}
                                value={count}
                            />
                }
            */
        },
        { 
            field: 'almacen',     
            headerName: `Almacén`,
            width: 100,
            sortable: false,
            renderCell: (cellValues) => {
                let data = cellValues;
                let almacen = data.row.almacen;
                return <Typography>
                    {almacen}
                </Typography>
            }
        },
        { 
            field: 'asignados',     
            headerName: `Transito`,
            width: 100,
            sortable: false,
            renderCell: (cellValues) => {
                let data = cellValues;
                let text = data.row.asignados;
                return <Typography>
                    {text === null ? 0 : text}
                </Typography>
            }
        }
    ];

    const editItemData = (itemData) => {

        let data = {
            articleId:  itemData.articleId,
            existence:  itemData.existence,
            price:      itemData.price,
            minStock:   itemData.minStock
        }

        setsending(true);
        setalertSuccessMessage("");

        axios({
            method: "PUT",
            url:    urlEditItemData,
            data
        }
            // config
        ).then((res) => {

            setsending(false);
            setchangeInputStock(false);

            setalertSuccessMessage(res.data.message);
            setTimeout(() => {
                setalertSuccessMessage("");
            }, 2000);

            if(res.data.result){
                // resetForm();
                // setopenModalAddItem(false);
            }

        }).catch((err) => {
            let fetchError = err;
        });
    }

    const handleCellEditStop = (params) => {
        // console.log(params);
        let dataBeforeEdit = params.row;
        if(dataBeforeEdit[params.field] !== params.value){

            console.log("Edit");
            // ------------------Edit-------------------------
            dataBeforeEdit[params.field] = params.value;
            console.log(dataBeforeEdit);
            let dataToEdit = dataBeforeEdit;
            editItemData(dataToEdit);
        }
    };

    const validateChanges = (params) => {
        if(params.field === "existence" && changeInputStock){
            console.log(params);
            let dataToEdit = params.row;
            editItemData(dataToEdit);
        }
    }

    return (
        <Page title="Inventario | CEMA">
        <Container maxWidth="xl">
            <Box sx={{ pb: 3 }}>
                <Typography variant="h4">
                    Inventario
                </Typography>
            </Box>
            
            <Modal
                open={openModalAddItem}
                onClose={handleCloseModalAddItem}
                aria-labelledby="modal-add-item-to-inventory"
                aria-describedby="modal-add-item-to-inventory"
                style={{ 
                    display:'flex', 
                    alignItems:'center', 
                    justifyContent:'center' 
                }}
            >
                <RootStyle>

                <FormikProvider value={formik}>
                    <Form autoComplete="off" noValidate onSubmit={handleSubmit}>

                    <Typography id="modal-modal-title" variant="h3" component="h3">
                        {typeForm === "create" ? "Agregar un producto" : "Editar un producto"}
                    </Typography>

                    <Grid container sx={{ mt: 3 }} columnSpacing={3}>
                        <Grid item md={typeForm === "create" ? 8 : 12}>
                            <Stack spacing={3}>
                                <TextField
                                    size='small'
                                    fullWidth
                                    autoComplete="name"
                                    type="text"
                                    label="Nombres"

                                    {...getFieldProps('name')}
                                    error={Boolean(touched.name && errors.name)}
                                    helperText={touched.name && errors.name}
                                />         
                            </Stack>
                        </Grid>
                        {typeForm === "create" &&
                            <Grid item md={4}>
                                <Stack spacing={3}>
                                    <TextField
                                        size='small'
                                        fullWidth
                                        autoComplete="existence"
                                        type="text"
                                        label="Existencia"

                                        InputProps={{
                                            type: "number"
                                        }}

                                        {...getFieldProps('existence')}
                                        error={Boolean(touched.existence && errors.existence)}
                                        helperText={touched.existence && errors.existence}
                                    />         
                                </Stack>
                            </Grid>
                        }
                        <Grid item md={12}>
                            <Stack spacing={3} sx={{my: 2}}>
                                <TextField
                                    size='small'
                                    fullWidth
                                    autoComplete="description"
                                    type="text"
                                    label="Descripción"

                                    multiline
                                    rows={2}
                                    maxRows={4}

                                    {...getFieldProps('description')}
                                    error={Boolean(touched.description && errors.description)}
                                    helperText={touched.description && errors.description}
                                />         
                            </Stack>
                        </Grid>
                    </Grid>

                    <LoadingButton
                        fullWidth
                        size="large"
                        type="submit"
                        variant="contained"
                        loading={sending}
                        color="primary"
                        disabled={
                            (!permissions.crea && typeForm === "create") || 
                            (!permissions.edita && typeForm === "edit")  || 
                            (values.name === "" || values.description === "")
                        }
                    >
                        {typeForm === "create" ? "Agregar" : "Editar"}
                    </LoadingButton>

                    </Form>
                </FormikProvider>
                    
                </RootStyle>
            </Modal>
            

            <Grid sx={{ pb: 3 }} item xs={12}>
                {!loading &&
                    <Card sx={{py: 3, px: 5}}>

                        <Grid container justifyContent="space-between" columnSpacing={3} sx={{mb: 3}}>
                            <Grid item lg={3}>
                                <Button onClick={() => openModal()} variant="contained" color="primary" fullWidth sx={{px : 3}} size="large">
                                    Nuevo Artículo
                                </Button>
                            </Grid>
                            <Grid item lg={4}>
                                {data !== null
                                ?
                                    <ExcelFile
                                        filename="inventario"
                                        element={
                                            <Button variant="contained" color="secondary" fullWidth sx={{px : 3}} size="large">
                                                Descargar Hoja de Inventario
                                            </Button>
                                        }
                                    >
                                        <ExcelSheet data={data} name="Inventario">
                                            <ExcelColumn label="Producto" value={(col) => col.article.name} />
                                            <ExcelColumn label="Existencia" value="existence" />
                                            <ExcelColumn label="Precio (usd)" value="price" />
                                            <ExcelColumn label="Stock mínimo" value="minStock" />
                                            <ExcelColumn label="Almacén" value="almacen" />
                                            <ExcelColumn label="Transito" value="asignados" />
                                        </ExcelSheet>
                                    </ExcelFile>
                                :
                                    <Button disabled variant="contained" color="secondary" fullWidth sx={{px : 3}} size="large">
                                        Descargar Hoja de Inventario
                                    </Button>
                                }
                            </Grid>
                        </Grid>

                        {alertSuccessMessage !== "" &&
                            <Alert sx={{mb: 3}} severity="success">
                                {alertSuccessMessage}
                            </Alert>
                        }

                        {alertErrorMessage !== "" &&
                            <Alert sx={{mb: 3}} severity="error">
                                {alertErrorMessage}
                            </Alert>
                        }
                    
                        {data !== null && data.length > 0 !== "" &&
                            <div className="inventario-content-table">

                                <Alert sx={{mb: 3}} severity="info">
                                    Puede modificar el valor de los elementos haciendo click.
                                </Alert>
                                
                                <div style={{display: 'table', tableLayout:'fixed', width:'100%'}}> 
                                    <DataGrid
                                        sx={{mb:4}}
                                        rows={data}
                                        columns={columns}

                                        // onCellEditStop={(params) => handleCellEditStop(params)}
                                        // experimentalFeatures={{ newEditingApi: true }}
                                        // onCellEditStart={(params) => handleCellEditStart(params)}
                                        // processRowUpdate={processRowUpdate}

                                        onCellEditCommit={(params) => handleCellEditStop(params)}
                                        onCellFocusOut={(params)   => validateChanges(params)}

                                        page={0}
                                        pageSize={6}
                                        rowsPerPageOptions={[6,10,20]}
                                        // autoPageSize
                                        rowCount={data.length}

                                        disableColumnFilter
                                        disableColumnMenu
                                        autoHeight 
                                        disableColumnSelector
                                        disableSelectionOnClick
                                        // checkboxSelection
                                    />
                                </div>

                                <ul style={{listStyle: "none"}}>
                                    <li>
                                        <Typography variant="h6" color="success">
                                            <i className="mdi mdi-checkbox-blank" style={{ color: "#54D62C" }} />
                                            <Typography sx={{ml: 2}} component="span" color="text.primary">
                                                <Typography sx={{fontWeight: "bold", mr: 1}} component="span">
                                                    Satisfactorio:
                                                </Typography> 
                                                Articulo con alta solvencia.
                                            </Typography>
                                        </Typography>
                                    </li>
                                    <li>
                                        <Typography variant="h6" color="warning">
                                            <i className="mdi mdi-checkbox-blank" style={{ color: "#FFC107" }} />
                                            <Typography sx={{ml: 2}} component="span" color="text.primary">
                                                <Typography sx={{fontWeight: "bold", mr: 1}} component="span">
                                                    Advertencia:
                                                </Typography> 
                                                Articulo cerca del stock mínimo.
                                            </Typography>
                                        </Typography>
                                    </li>
                                    <li>
                                        <Typography variant="h6" color="primary">
                                            <i className="mdi mdi-checkbox-blank" />
                                            <Typography sx={{ml: 2}} component="span" color="text.primary">
                                                <Typography sx={{fontWeight: "bold", mr: 1}} component="span">
                                                    Alerta:
                                                </Typography> 
                                                Articulo igual o por debajo del stock mínimo.
                                            </Typography>
                                        </Typography>
                                    </li>
                                </ul>
                            </div>
                        }

                        {loading &&
                            <Loader />
                        }
                    
                    </Card>
                }

                {loading &&
                    <Card sx={{py: 3, px: 5}}>
                        <Loader />
                    </Card>
                }
            </Grid>
        </Container>
        </Page>
    );
}


export default Inventario;