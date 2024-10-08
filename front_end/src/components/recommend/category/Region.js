import {React, useState, forwardRef, useImperativeHandle } from "react";
import styled from "styled-components";
import { getRecipeList } from "api/CategoryApi";
import Card from "components/commons/Card";
import Pagination from "react-js-pagination";
import "assets/css/Pagination.css";
import { CircularProgress } from "@mui/material";


const Container = styled.div`
  margin: 1rem 0;
`

const RegionButton = styled.button`
  display: inline-block;
  font-size: 1rem;
  font-weight: 400;
  cursor: pointer;
  background-color: white;
  margin: 0 1rem 0 0;
  padding-inline: 1rem;
  border: none;
  border-radius: 10rem;
  height: 2rem;
`

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: 21.5rem 21.5rem 21.5rem 21.5rem;
  justify-content: center;
`

const PageContainer = styled.div`
  margin: 2rem 0 5rem 0;
`



const Region = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({
    getRegionRecipe(){
      getEuropeRecipe();
    }
  }))

  const [europeShow, setEuropeShow] = useState(true);
  const [asiaShow, setAsiaShow] = useState(false);
  const [americaShow, setAmericaShow] = useState(false);
  const [africaShow, setAfricaShow] = useState(false);
  const [Oceaniahow, setOceaniaShow] = useState(false);
  const [RecipeList, setRecipeList] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1); 

  const handlePageChange = (page) => { 
    window.scrollTo(0, 0)
    setPage(page); 
    if (europeShow === true) {
      getEuropeRecipe(page);
    }
    if (asiaShow === true) {
      getAsiaRecipe(page);
    }
    if (americaShow === true) {
      getAmericaRecipe(page);
    }
    if (africaShow === true) {
      getAfricaRecipe(page);
    }
    if (Oceaniahow === true) {
      getOceaniaRecipe(page);
    }
  };

  const getEuropeRecipe = async(page) => {
    setIsLoading(true);
    setEuropeShow(true);
    setAsiaShow(false);
    setAmericaShow(false);
    setAfricaShow(false);
    setOceaniaShow(false);
    if (isNaN(page) === true) {
      setPage(1); 
      page = 1;
    }
    const Recipe = await getRecipeList(page, "Europe");
    if (Recipe) {
      setRecipeList(Recipe.data);
      setIsLoading(false);
      setTotalCount(Recipe.total_count);
    }
  }

  const getAsiaRecipe = async(page) => {
    setEuropeShow(false);
    setAsiaShow(true);
    setAmericaShow(false);
    setAfricaShow(false);
    setOceaniaShow(false);
    if (isNaN(page) === true) {
      setPage(1); 
      page = 1;
    }
    const Recipe = await getRecipeList(page, "Asia");
    if (Recipe) {
      setRecipeList(Recipe.data);
      setIsLoading(false);
      setTotalCount(Recipe.total_count);
    }
  }

  const getAmericaRecipe = async(page) => {
    setIsLoading(true);
    setEuropeShow(false);
    setAsiaShow(false);
    setAmericaShow(true);
    setAfricaShow(false);
    setOceaniaShow(false);
    if (isNaN(page) === true) {
      setPage(1); 
      page = 1;
    }
    const Recipe = await getRecipeList(page, "America");
    if (Recipe) {
      setRecipeList(Recipe.data);
      setIsLoading(false);
      setTotalCount(Recipe.total_count);
    }
  }

  const getAfricaRecipe = async(page) => {
    setIsLoading(true);
    setEuropeShow(false);
    setAsiaShow(false);
    setAmericaShow(false);
    setAfricaShow(true);
    setOceaniaShow(false);
    if (isNaN(page) === true) {
      setPage(1); 
      page = 1;
    }
    const Recipe = await getRecipeList(page, "Africa");
    if (Recipe) {
      setRecipeList(Recipe.data);
      setIsLoading(false);
      setTotalCount(Recipe.total_count);
    }
  }

  const getOceaniaRecipe = async(page) => {
    setIsLoading(true);
    setEuropeShow(false);
    setAsiaShow(false);
    setAmericaShow(false);
    setAfricaShow(false);
    setOceaniaShow(true);
    if (isNaN(page) === true) {
      setPage(1); 
      page = 1;
    }
    const Recipe = await getRecipeList(page, "Oceania");
    if (Recipe) {
      setRecipeList(Recipe.data);
      setIsLoading(false);
      setTotalCount(Recipe.total_count);
    }
  }
  
  return (
    <Container>
      <div>
        {europeShow ? <RegionButton onClick={()=>{getEuropeRecipe(1)}} style={{backgroundColor: "#ED8141", color: "white"}}>EUROPE</RegionButton> : <RegionButton onClick={getEuropeRecipe}>EUROPE</RegionButton>}
        {asiaShow ? <RegionButton onClick={()=>getAsiaRecipe(1)} style={{backgroundColor: "#ED8141", color: "white"}}>ASIA</RegionButton> : <RegionButton onClick={getAsiaRecipe}>ASIA</RegionButton>}
        {americaShow ? <RegionButton onClick={()=>getAmericaRecipe(1)} style={{backgroundColor: "#ED8141", color: "white"}}>AMERICA</RegionButton> : <RegionButton onClick={getAmericaRecipe}>AMERICA</RegionButton>}
        {africaShow ? <RegionButton onClick={()=>getAfricaRecipe(1)} style={{backgroundColor: "#ED8141", color: "white"}}>AFRICA</RegionButton> : <RegionButton onClick={getAfricaRecipe}>AFRICA</RegionButton>}
        {Oceaniahow ? <RegionButton onClick={()=>getOceaniaRecipe(1)} style={{backgroundColor: "#ED8141", color: "white"}}>OCEANIA</RegionButton> : <RegionButton onClick={getOceaniaRecipe}>OCEANIA</RegionButton>}
      </div>  
      {isLoading ? <div style={{display: "flex", justifyContent: "center", marginTop: "2rem"}}><CircularProgress sx={{ color: '#ED8141', marginTop: '5rem' }} /></div> :
        <CardContainer>
          {RecipeList.map((Recipe, index) => (
            <Card
              key={Recipe.recipe_seq}
              recipeSeq={Recipe.recipe_seq}
              index={index}
              recipeImg={Recipe.images}
              recipeName={Recipe.name}
              recipeKeywords={(Recipe.keywords.length > 1 ? [Recipe.keywords[0].keyword_name, Recipe.keywords[1].keyword_name] : Recipe.keywords[0].keyword_name)}
              recipeCalorie={Recipe.calories}
              recipeRating={Recipe.average_rating}
              likedCount={Recipe.liked_count}
            />
          ))}
        </CardContainer>
      }
      {isLoading ? null :       
      (RecipeList.length !== 0 ?      
        <PageContainer>
          <Pagination 
            activePage={page} 
            itemsCountPerPage={24} 
            totalItemsCount={totalCount} 
            pageRangeDisplayed={5} 
            prevPageText={"‹"} 
            nextPageText={"›"} 
            onChange={handlePageChange}
          />
        </PageContainer> : null
      )}
    </Container>
  );
});

export default Region;