import { useQuery } from "@apollo/client";
import { ProductsC } from "./components";
import { GET_PRODUCTS } from "./queries";
import { useEffect, useRef, useState } from "react";
import { AVAILABILITY, DayjsExtended, PRODUCTS_TYPES, TLocation, TProducts } from "./types";
import moment from "moment";
import { RENT_TYPES } from "./types";
import dayjs, { Dayjs } from "dayjs";

export const ProductsV = () => {
  // Query and Mutations
  const {
    data: dataProducts,
    called: calProducts,
    error: errProducts,
    loading: loadProducts,
  } = useQuery(GET_PRODUCTS, { fetchPolicy: "cache-and-network" });

  const [location, setLocation] = useState<TLocation>();
  const [products, setProducts] = useState<TProducts[]>();
  const [modal, setModal] = useState<boolean>(false);
  const [dateInit, setDateInit] = useState<DayjsExtended | null>(null);
  const [dateEnd, setDateEnd] = useState<DayjsExtended | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<TProducts>();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [availability, setAvailability] = useState<string>();
  const [isNotAvilabilityPerHours, setIsNotAvailabilityPerHours] =
    useState<boolean>();

  const handleDateChange = (date: any | null) => {
    const formattedDate = moment(date?.$d).format("DD-MM-YYYY");

    if (selectedProduct?.type === PRODUCTS_TYPES.RENT) {
      
      const daysFormat = selectedProduct.rentProduct?.rentedDays && JSON.parse(selectedProduct.rentProduct?.rentedDays)
      if (daysFormat.includes(formattedDate)) {
        setAvailability(AVAILABILITY.OCCUPIED);
      } else {
        setAvailability(AVAILABILITY.AVAILABLE);
      }

    }else if (selectedProduct?.type === PRODUCTS_TYPES.SPACE){

      const daysFormat =
        selectedProduct.spaceProduct?.rentedDays &&
        JSON.parse(selectedProduct.spaceProduct?.rentedDays);

      if (daysFormat.includes(formattedDate)) {
        setAvailability(AVAILABILITY.OCCUPIED);
      } else {
        setAvailability(AVAILABILITY.AVAILABLE);
      }
    }

    if (date === null) setAvailability(undefined)
    setSelectedDate(date);
  };

   const handleDateChangeTime = (
     event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
     type: string
   ) => {
     const value = event.target.value;
     const newDate = dayjs(value) as DayjsExtended;
     if (type === "inicio") {
       setDateInit(newDate);
     } else {
       setDateEnd(newDate);
     }
   };

  const changeProductSelected = (product: TProducts) => {
    setSelectedProduct(product);
    handleDateChange(null)
    setModal(true);
    setDateInit(null);
    setDateEnd(null);
    if (product?.type === PRODUCTS_TYPES.SPACE) {
      const valor: TLocation = product?.spaceProduct?.location && JSON.parse(product?.spaceProduct?.location);
      setLocation(valor);
      
    }
  };

  const  isDateRangeOccupied = (
    start: Date,
    end: Date,
    rentedDays: { initialDate: string; finalDate: string }[]
  ) => {
    for (const rentedDay of rentedDays) {
      const rentedStart = new Date(rentedDay.initialDate);
      const rentedEnd = new Date(rentedDay.finalDate);

      if (
        (start >= rentedStart && start <= rentedEnd) ||
        (end >= rentedStart && end <= rentedEnd) ||
        (start <= rentedStart && end >= rentedEnd)
      ) {
        // Existe solapamiento
        return true;
      }
    }

    // No existe solapamiento
    return false;
  }

  useEffect(() => {
    if(dateInit?.$d && dateEnd?.$d){
      const rentedDaysFormat = selectedProduct?.rentProduct?.rentedDays &&  JSON.parse(selectedProduct?.rentProduct?.rentedDays)
      const isNotAvailable = isDateRangeOccupied(dateInit?.$d, dateEnd?.$d, rentedDaysFormat);
      setIsNotAvailabilityPerHours(isNotAvailable);
    }else{
      setIsNotAvailabilityPerHours(undefined);
    }
  }, [dateInit, dateEnd]);
  


  useEffect(() => {
    const res = dataProducts?.products;
    if (res?.length && calProducts) {
      setProducts(res);
    }

    /*if (errProducts) {
       setAlertBox({
         message: "No se ha encontrado ninguna empresa.",
         color: "info",
         duration: 3000,
       });
     }*/
  }, [dataProducts, calProducts, errProducts]);

  return (
    <ProductsC
      data={{
        products,
        modal,
        selectedProduct,
        location,
        selectedDate,
        availability,
        dateInit,
        dateEnd,
        isNotAvilabilityPerHours,
      }}
      setModal={setModal}
      setDateInit={setDateInit}
      handleDateChangeTime={handleDateChangeTime}
      setDateEnd={setDateEnd}
      handleDateChange={handleDateChange}
      changeProductSelected={changeProductSelected}
    />
  );
}
