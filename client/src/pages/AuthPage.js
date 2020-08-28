import React, {useContext, useEffect, useState} from "react"
import {useHttp} from "../hooks/http.hook"
import {useMessage} from "../hooks/message.hook"
import {AuthContext} from "../context/AuthContext"

export const AuthPage = () => {
    const auth = useContext(AuthContext)
    const message = useMessage()
    const {loading, error, request, clearError} = useHttp()
    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    useEffect(() => {
        window.M.updateTextFields()
    }, [])

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form})
            message(data.message)
        } catch (e) {
        }
    }

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form})
            message(data.message)
            auth.login(data.token, data.userId)
        } catch (e) {
        }
    }

    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h1 className="mb-1">Сократи ссылку</h1>
                <div className="card red accent-2">
                    <div className="card-content white-text">
                        <span className="card-title mb-1">Авторизация</span>
                        <div>

                            <div className="input-field input-field-auth">
                                <input
                                    className="white-text"
                                    placeholder="Введите email"
                                    id="email"
                                    type="text"
                                    name="email"
                                    value={form.email}
                                    onChange={changeHandler}
                                />
                                <label htmlFor="email">Введите email</label>
                            </div>

                            <div className="input-field input-field-auth">
                                <input
                                    className="white-text"
                                    placeholder="Введите пароль"
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={form.password}
                                    onChange={changeHandler}
                                />
                                <label htmlFor="email">Введите пароль</label>
                            </div>


                        </div>
                    </div>
                    <div className="card-action">
                        <button
                            className="btn teal lighten-1 mr-1"
                            onClick={loginHandler}
                            disabled={loading}
                        >Войти
                        </button>
                        <button
                            className="btn blue-grey lighten-5 black-text"
                            onClick={registerHandler}
                            disabled={loading}
                        >Регистрация
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}