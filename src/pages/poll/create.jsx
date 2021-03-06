import Head from "next/head";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import styles from "../../styles/Home.module.css";
import Option from "../../components/Option";
import { useState } from "react";
import { BsTrashFill } from "react-icons/bs";

export default function Create() {
  const [options, setNewOption] = useState([]);
  const option = <Option />;

  const handleClick = e => {
    e.preventDefault();
    setNewOption([...options, option]);
  };

  const handleDelete = index => {
    console.log(index);
    // Se o index da opção de votação que cliquei existir na array de Options, então o remova da array
    const updatedArr = options.filter(
      voteOption => options.indexOf(voteOption) != index
    );
    setNewOption(updatedArr);
  };

  return (
    <>
      <Head>
        <title>Criar votação</title>
      </Head>

      {/* Page header */}
      <Header option="Votações" href="/" />
      <h2 className="text-center text-white">Crie sua votação</h2>
      <div
        className={`${"container-fluid w-50  rounded border border-start-0 border-end-0 border-3 border-info mt-3 mb-4 p-5 "} ${
          styles.main
        }`}
      >
        <form action="/api/form" method="post">
          {/* Poll title */}
          <div className="row gx-3 gy-3">
            <div className="col-8">
              <label htmlFor="title" className="form-label text-white">
                Título
              </label>
              <input
                type="text"
                className="form-control bg-light bg-opacity-10 border-2 border-top-0 border-bottom-0 border-warning p-2 text-white"
                id="name"
                placeholder="Eleição para..."
                name="name"
                required
              />
              <div className="invalid-feedback">É necessário um título</div>
            </div>
            {/* Finishing date */}
            <div className="col-4">
              <label htmlFor="zip" className="form-label text-white">
                Data de finalização
              </label>
              <input
                type="date"
                className="form-control bg-light bg-opacity-10 border-2 border-top-0 border-bottom-0 border-warning p-2 text-white"
                id="date"
                placeholder=""
                name="expire"
                required
              />
              <div className="invalid-feedback">Zip code required.</div>
            </div>

            {/* Poll options */}
            <div className="col-12" id="options-container">
              <p className="text-white m-0">Opções de votação</p>
              {/* Polls must be here */}
              {/* Opções tem 1 elemento pelo menos? */}
              {options.length >= 1
                ? // Sim? então dentro de uma div insira uma option com seu respectivo index
                  options.map((option, index) => {
                    return (
                      <div className="position-relative">
                        <Option key={index} number={index} />
                        <button
                          key={`key${index}`}
                          className={styles.option_delete}
                          onClick={e => {
                            e.preventDefault();
                            handleDelete(index);
                          }}
                        >
                          <BsTrashFill />
                        </button>
                      </div>
                    );
                  })
                : ""}
            </div>
            {/* Create/submit buttons */}
            <div className=" d-flex justify-content-between">
              <button className="btn btn-warning mt-3" onClick={handleClick}>
                Adicionar opção
              </button>
              <button className="btn btn-warning mt-3" type="submit">
                Concluir
              </button>
            </div>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
}
