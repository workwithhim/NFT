import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import emailjs from 'emailjs-com';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import 'react-toastify/dist/ReactToastify.min.css';
import './ContactUs.scss';
import { handleSendRequst } from 'apis';

const ContactForm = () => {
  const validationSchema = yup.object().shape({
    firstname: yup.string().required('Firstname is required'),
    lastname: yup.string().required('Lastname is required'),
    email: yup.string()
      .required('Email is required')
      .email('Email is invalid'),
    subject: yup.string().required('Subject is required'),
    message: yup.string().required('Message is required'),
  });
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors }
  } = useForm(
    {
      resolver: yupResolver(validationSchema)
    }
  );
  const [disabled, setDisabled] = useState(false);
  const ContactUS_EndPoint = "https://www.algonrichtestbackend.com/contactus/endpoint";
  const onError = (errors: any, e: any) => {

    for (let key in errors) {
      toastError(errors[key].message);
    }
  };

  const toastError = (msg: string) => {
    toast.error(msg, {
      position: 'bottom-right',
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      className: 'submit-feedback success toast-setting',
      toastId: 'notifyToast'
    });
  }
  const toastifySuccess = (msg: string) => {
    toast.success(msg, {
      position: 'bottom-right',
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      className: 'submit-feedback success toast-setting',
      toastId: 'notifyToast',
    });
  };
  const toastifyInfo = (msg: string) => {
    toast.info(msg, {
      position: 'bottom-right',
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      className: 'submit-feedback info toast-setting',
      toastId: 'notifyToast',
    });
  }


  const onSubmit = async (data: any) => {
    const { firstname, lastname, email, subject, message } = data;
    try {
      // Disable form while processing submission
      setDisabled(true);

      // Define template params
      const params = {
        firstname,
        lastname,
        email,
        subject,
        message
      };
      // reset();
      handleSendRequst(params).then((res) => {
        if (res.data == true) {
          toastifySuccess("Message sent  !");
        } else {
          toastifyInfo("Sorry, We recieved your message already");
        }
      }).catch((e) => {
        toastError("Network Error");
      });
      setDisabled(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className='contactus_form mt-[150px]'>
      <form
        className='w-[90%] md:w-[100%]'
        onSubmit={handleSubmit(onSubmit, onError)}
      >
        <div className='contactus-title'>
          <h1>contact us</h1>
        </div>
        <div className="form_input">
          <div className="w-full md:w-1/2 md:mb-0 md:pr-2">
            <label htmlFor="firstname">
              First Name
            </label>
            <input
              id="firstname"
              {...register("firstname")}
            />
          </div>
          <div className="w-full md:w-1/2 md:pl-2">
            <label htmlFor="lastname">
              Last Name
            </label>
            <input
              id="lastname"
              {...register("lastname")}
            />
          </div>
        </div>
        <div className="form_input">
          <div className="w-full">
            <label htmlFor="email">
              E-mail
            </label>
            <input
              id="email"
              type="email"
              {...register("email")}
            />
          </div>
        </div>
        <div className="form_input">
          <div className="w-full">
            <label htmlFor="subject">
              Subject
            </label>
            <input
              id="subject"
              type="text"
              {...register("subject")}
            />
          </div>
        </div>
        <div className="form_input">
          <div className="w-full">
            <label htmlFor="message">
              Message
            </label>
            <textarea
              className="no-resize h-48 resize-none" id="message"
              {...register("message")}
            ></textarea>
          </div>
        </div>
        <div className="form_input">
          <div className="md:w-1/3">
            <button className="inline-block w-full px-4 py-2 text-white rounded-0 border-[1px] rounded-[4px]  border-[#3d4db5] font-bold font-chakrapetch hover:text-[#3d4db5] hover:border-transparent hover:bg-white uppercase transition ease-in-ease" type="submit">
              Send
            </button>
          </div>
          <div className="md:w-2/3"></div>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;