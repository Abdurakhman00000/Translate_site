"use client";

import React from "react";
import scss from "./Contact.module.scss";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";

// interface for type
interface IFormTelegram {
  name: string;
  lastName: string;
  email: string;
  message: string;
  phone: number;
}

/// imports from ENV
const TG_TOKEN = process.env.NEXT_PUBLIC_TELEGRAM_TOKEN;
const CHAD_ID = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID;
/// imports from ENV

const Contact = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<IFormTelegram>({
    mode: "onChange",
  });

  const botsMessageModel = (data: IFormTelegram) => {
    let messageTG = `User's name: <b>${data.name}</b>\n`;
    messageTG += `User's surname: <b>${data.lastName}</b>\n`;
    messageTG += `User's email: <b>${data.email}</b>\n`;
    messageTG += `User's message for you: <b>${data.message}</b>\n`;
    messageTG += `User's phone number: <b>${data.phone}</b>`;
    return messageTG;
  };

  const onSumbit: SubmitHandler<IFormTelegram> = async (data) => {
    await axios.post(`https://api.telegram.org/bot${TG_TOKEN}/sendMessage`, {
      chat_id: CHAD_ID,
      parse_mode: "html",
      text: botsMessageModel(data),
    });
    reset();
  };

  return (
    <section className={scss.Contact}>
      <div className="container">
        <div className={scss.content}>
            <div className={scss.content_info}>
            <h1>Связаться</h1>
            <p>
              Мой почтовый ящик всегда открыт. Если у вас <br /> есть вопрос или
              вы просто хотите сказать привет, я <br /> постараюсь ответить вам!
            </p>
            </div>
          <form onSubmit={handleSubmit(onSumbit)}>
            <div className={scss.inputs}>
              {/* input #1  */}
              <input
                type="text"
                placeholder="Введите свое имя..."
                {...register("name", { required: true })}
              />
              {errors.name && <span>Введите имя!</span>}
              {/* input #2  */}
              <input
                type="text"
                placeholder="Введите свою фамилию..."
                {...register("lastName", { required: true })}
              />
              {errors.lastName && <span>Введите фамилию!</span>}
              {/* input #3  */}
              <input
                type="text"
                placeholder="Введите название своей email..."
                {...register("email", {
                  required: true,
                  pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                })}
              />
              {errors.email && <span>Invalid Email!</span>}
              {/* input #4 */}
              <input
                type="text"
                placeholder="Введите ваше номер телефона..."
                {...register("phone", { required: true })}
              />
              {errors.phone && <span>Введите ваш номер телефона!</span>}
              {/* input #5 */}
              <input
                className="inputMessage"
                type="text"
                placeholder="Введите сообщение для админа..."
                {...register("message", { required: true })}
              />
              {errors.message && (
                <span>Введите ваше сообщение для админа!</span>
              )}
            </div>
            <div className={scss.button}>
              {isSubmitting ? (
                <button disabled>Send...</button>
              ) : (
                <button>Send</button>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
