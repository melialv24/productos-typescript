import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import InfoIcon from "@mui/icons-material/Info";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { BoxCards, BoxPrincipal, BoxText } from "./styled";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AVAILABILITY, PRODUCTS_TYPES, RENT_TYPES, TProductsC } from "./types";
import {
  DialogActions,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { FC } from 'react';
import { MapComponent } from "./components/map";
import { DateTimePicker } from "@mui/x-date-pickers";
import dayjs from 'dayjs';
import moment from "moment";

export const ProductsC: FC<TProductsC> = ({
  data: {
    products,
    modal,
    selectedProduct,
    location,
    selectedDate,
    availability,
    dateInit,
    dateEnd,
    isNotAvilabilityPerHours
  },
  setModal,
  setDateInit,
  setDateEnd,
  handleDateChangeTime,
  handleDateChange,
  changeProductSelected,
}) => {

  return (
    <BoxPrincipal>
      <BoxCards>
        {products?.map((item) => (
          <Card
            key={item?.id}
            sx={{ maxWidth: 345, boxShadow: "0 0 10px 5px #59595dd2" }}
          >
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image={process.env.PUBLIC_URL + item?.image}
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {item?.name}{" "}
                  {item?.type === PRODUCTS_TYPES.RENT &&
                    `(${item.rentProduct?.rentType})`}
                </Typography>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Typography variant="body2" color="text.secondary">
                    Vendedor: {item?.nameSeller}
                  </Typography>
                  {item?.type === PRODUCTS_TYPES.SIMPLE && (
                    <Typography
                      variant="body2"
                      color={
                        item?.simpleProduct?.inventory &&
                        item?.simpleProduct?.inventory > 0
                          ? "green"
                          : "red"
                      }
                    >
                      Disponibilidad:{" "}
                      {item?.simpleProduct?.inventory &&
                      item?.simpleProduct?.inventory > 0
                        ? item?.simpleProduct?.inventory
                        : "NO HAY DISPONIBLES"}
                    </Typography>
                  )}
                </div>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button
                size="small"
                color="primary"
                onClick={() => changeProductSelected(item)}
              >
                <InfoIcon />
              </Button>
            </CardActions>
          </Card>
        ))}
      </BoxCards>

      <Dialog
        open={modal}
        onClose={() => setModal(false)}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {selectedProduct?.name}
        </DialogTitle>
        <DialogContent style={{ width: "500px" }}>
          <div style={{ marginBottom: "20px" }}>
            <CardMedia
              component="img"
              style={{ marginBottom: "20px" }}
              height="200"
              image={process.env.PUBLIC_URL + selectedProduct?.image}
              alt="green iguana"
            />
            <MapComponent location={location} type={selectedProduct?.type} />
            {((selectedProduct?.type === PRODUCTS_TYPES.RENT &&
              selectedProduct.rentProduct?.rentType === RENT_TYPES.DAYS) ||
              selectedProduct?.type === PRODUCTS_TYPES.SPACE) && (
              <div key={selectedProduct.id}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    value={selectedDate}
                    onChange={handleDateChange}
                  />
                </LocalizationProvider>
                {availability && (
                  <Typography
                    variant="body2"
                    color={
                      availability === AVAILABILITY.AVAILABLE ? "green" : "red"
                    }
                  >
                    Disponibilidad: {availability}
                  </Typography>
                )}
              </div>
            )}

            {selectedProduct?.type === PRODUCTS_TYPES.RENT &&
              selectedProduct.rentProduct?.rentType === RENT_TYPES.HOURS && (
                <div key={selectedProduct?.id}>
                  <BoxText>
                    <TextField
                      id="datetime-local"
                      label="Next appointment"
                      type="datetime-local"
                      value={
                        dateInit
                          ? dateInit.format("YYYY-MM-DDTHH:mm")
                          : moment().format("YYYY-MM-DDTHH:mm")
                      }
                      onChange={(newValue) => {
                        handleDateChangeTime(newValue, "inicio");
                      }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </BoxText>
                  <BoxText>
                    <TextField
                      id="datetime-local"
                      label="Next appointment"
                      type="datetime-local"
                      value={
                        dateEnd
                          ? dateEnd.format("YYYY-MM-DDTHH:mm")
                          : moment().format("YYYY-MM-DDTHH:mm")
                      }
                      onChange={(newValue) => {
                        handleDateChangeTime(newValue, "final");
                      }}
                      defaultValue="2017-05-24T10:30"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </BoxText>
                  {isNotAvilabilityPerHours !== undefined && (
                    <Typography
                      variant="body2"
                      color={isNotAvilabilityPerHours ? "red" : "green"}
                    >
                      Disponibilidad:{" "}
                      {isNotAvilabilityPerHours
                        ? "NO DISPONIBLE"
                        : "DISPONIBLE"}
                    </Typography>
                  )}
                </div>
              )}
          </div>
          <BoxText>
            <DialogContentText style={{ fontWeight: "bold" }}>
              Vendedor: {""}{" "}
            </DialogContentText>
            <DialogContentText>{selectedProduct?.nameSeller}</DialogContentText>
          </BoxText>
          <BoxText>
            <DialogContentText style={{ fontWeight: "bold" }}>
              Precio: {""}{" "}
            </DialogContentText>
            <DialogContentText>{selectedProduct?.price}</DialogContentText>
          </BoxText>
          {(selectedProduct?.type === PRODUCTS_TYPES.RENT ||
            selectedProduct?.type === PRODUCTS_TYPES.SPACE) && (
            <BoxText>
              <DialogContentText style={{ fontWeight: "bold" }}>
                Tipo de alquiler: {""}{" "}
              </DialogContentText>
              <DialogContentText>
                {selectedProduct?.type === PRODUCTS_TYPES.RENT
                  ? selectedProduct.rentProduct?.rentType
                  : RENT_TYPES.DAYS}
              </DialogContentText>
            </BoxText>
          )}
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={() => setModal(false)}>
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </BoxPrincipal>
  );
};
