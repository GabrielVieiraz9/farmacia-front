import { useEffect, useState } from "react";
import { Dna } from "react-loader-spinner";
import Categoria from "../../../models/Categoria";
import { buscar } from "../../../services/Service";
import CardCategorias from "../cardCategorias/CardCategorias";
import { Link } from "react-router-dom";

function ListaCategorias() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  async function buscarCategorias() {
    try {
      await buscar("/categorias", setCategorias);
    } catch (error: any) {
      if (error.toString().includes("403")) {
        alert("O token expirou, favor logar novamente");
      }
    }
  }

  useEffect(() => {
    buscarCategorias();
  }, [categorias.length]);
  return (
    <>
      {categorias.length === 0 && (
        <Dna
          visible={true}
          height="200"
          width="200"
          ariaLabel="dna-loading"
          wrapperStyle={{}}
          wrapperClass="dna-wrapper mx-auto"
        />
      )}
      <div className="min-h-[80vh]">
        <div className="flex justify-center w-full my-4">
          <div className="container flex flex-col">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categorias.map((categoria) => (
                <>
                  <CardCategorias key={categoria.id} categoria={categoria} />
                </>
              ))}
            </div>
            <div className="flex justify-center w-full my-4 gap-4">
              <div className="pt-5">
                <Link
                  to="/editarCategoria/:id"
                  className="inline-block bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                  Editar categoria
                </Link>
              </div>

              <div className="pt-5">
                <Link
                  to="/deletarCategoria/:id"
                  className="inline-block bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Deletar categoria
                </Link>
              </div>
            </div>
            <div className="pt-5">
              <Link
                to="/home"
                className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Voltar para a home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ListaCategorias;
