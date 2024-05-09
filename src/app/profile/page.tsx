"use client";
// React Import
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
// MUI Import
import {
  Button,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Card,
  Box,
  CardContent,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { LoadingButton } from "@mui/lab";
// validation import
// import { userProfileValidations } from "@/validation_schema/profileValidation";

import { yupResolver } from "@hookform/resolvers/yup";
import { ToastContainer } from "react-toastify";
// Types Import
import { userType } from "../types/userType";
// CSS Import
import "react-toastify/dist/ReactToastify.css";
// External Components
import Navbar from "@/components/Navbar";
import SpinnerProgress from "@/common/spinnerPgress";
import CircularProgressBar from "@/common/CircularProcess/circularProgressBar";
import { capitalizeFirstLetter } from "@/common/capitalizFirstLetter";
// API services
import { HandleProfile, HandleUpdateProfile } from "../services/userServices";

export default function Profile() {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isLoadingButton, setLoadingButton] = useState<boolean>(false);
  const [getUserData, setUserData] = useState<userType | null>(null);
  const [toggle, setToggle] = useState<boolean>(false);
  const [previewProfile, setPreviewProfile] = useState<string | any>("");
  

  console.log(getUserData);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<userType | any>({
    // resolver: yupResolver(userProfileValidations),
  });

  useEffect(() => {
    let localData: any;
    if (typeof window !== "undefined") {
      localData = window.localStorage.getItem("userData");
    }
    if (localData) {
      const userId = JSON.parse(localData);
      getProfileData(userId?._id);
    }
  }, []);

  const onSubmit = async (event: any) => {
    const reqData = { ...event };
    const formData = new FormData();

    for (var key in reqData) {
      formData.append(key, reqData[key]);
    }
    setLoadingButton(true);
    await HandleUpdateProfile(reqData._id, event)
      .then((res) => {
        setLoadingButton(false);
        setTimeout(() => {
          setToggle(!toggle);
          getProfileData(res.data._id);
        }, 1000);
        setLoadingButton(false);
      })
      .catch((err) => {
        console.log(err);
        setLoadingButton(false);
      });
  };

  const getProfileData = (userId: any) => {
    setLoading(true);
    let localData1: any;
    HandleProfile(userId).then((user) => {
      setUserData(user.data);
      const fields = [
        "_id",
        "name",
        "mobile",
        "address",
        "email",
        "company_name",
        "company_email",
      ];
      fields.forEach((field) => setValue(field, user.data[field]));
      // setValue("role_id",user.data['role_id'] === "1" ? "Admin" : "Learner")
      setLoading(false);
      if (typeof window !== "undefined") {
        localData1 = window.localStorage.getItem("userData");
      }
    });
  };

  function ErrorShowing(errorMessage: any) {
    return (
      <Typography variant="body2" color={"error"} gutterBottom>
        {errorMessage}{" "}
      </Typography>
    );
  }

  const handleEdit = async () => {
    setToggle(!toggle);
  };

  return (
    <>
      <Navbar />
      <Box>
        <Box>
          {/* main content */}
          <Card>
            <CardContent>
              {!isLoading ? (
                <Box
                  component="form"
                  method="POST"
                  noValidate
                  autoComplete="off"
                  onSubmit={handleSubmit(onSubmit)}
                  onReset={reset}
                >
                  {getUserData ? (
                    <>
                      <Grid container spacing={3} marginBottom={"20px"}>
                        <Grid item xs={12} sm={12} md={12} lg={12}></Grid>
                      </Grid>
                      <IconButton onClick={handleEdit}>
                        Click to Edit <EditIcon />
                      </IconButton>
                      <Grid
                        container
                        spacing={4}
                      >
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                          <TextField
                            fullWidth
                            label="Name"
                            {...register("name")}
                            defaultValue={getUserData?.name}
                            disabled={!toggle}
                          />
                          {errors && errors.first_name
                            ? ErrorShowing(errors?.first_name?.message)
                            : ""}
                        </Grid>

                        <Grid item xs={12} sm={12} md={6} lg={6}>
                          <TextField
                            fullWidth
                            label="Mobile"
                            {...register("mobile")}
                            defaultValue={getUserData?.mobile}
                            disabled={!toggle}
                          />
                          {errors && errors.last_name
                            ? ErrorShowing(errors?.last_name?.message)
                            : ""}
                        </Grid>

                        <Grid item xs={12} sm={12} md={6} lg={6}>
                          <TextField
                            fullWidth
                            label="Address"
                            {...register("address")}
                            defaultValue={getUserData?.address}
                            disabled={!toggle}
                          />
                          {errors && errors.address
                            ? ErrorShowing(errors?.address?.message)
                            : ""}
                        </Grid>

                        <Grid item xs={12} sm={12} md={6} lg={6}>
                          <TextField
                            fullWidth
                            label="Email"
                            {...register("email")}
                            defaultValue={getUserData?.email}
                            disabled={!toggle}
                          />
                          {errors && errors.email
                            ? ErrorShowing(errors?.email?.message)
                            : ""}
                        </Grid>

                        {toggle && (
                          <Grid
                            item
                            xs={12}
                            sm={12}
                            md={12}
                            lg={12}
                            textAlign={"right"}
                          >
                            {!isLoadingButton ? (
                              <Button
                                type="submit"
                                size="large"
                                variant="contained"
                              >
                                Update Profile
                              </Button>
                            ) : (
                              <LoadingButton
                                loading={isLoadingButton}
                                size="large"
                                variant="contained"
                                disabled
                              >
                                <CircularProgressBar />
                              </LoadingButton>
                            )}
                          </Grid>
                        )}
                      </Grid>
                    </>
                  ) : (
                    "Record not found"
                  )}
                </Box>
              ) : (
                <SpinnerProgress />
              )}
            </CardContent>
          </Card>
        </Box>
      </Box>
      <ToastContainer />
    </>
  );
}
