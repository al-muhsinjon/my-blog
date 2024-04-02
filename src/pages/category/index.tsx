import { CategoryType } from "@/src/interfaces/categories.interface";
import Layout from "@/src/layout/layout";
import Seo from "@/src/layout/seo/seo";
import { BlogService } from "@/src/services/blog.service";
import { Box, Button, ButtonGroup, Typography } from "@mui/material";
import { GetServerSideProps } from "next";
import { useRouter } from "next/navigation";
import React from "react";

const CategoryPage = ({ categories }: CategoryPageProps) => {
  const router = useRouter();

  return (
    <Seo metaTitle="All Categories">
      <Layout>
        <Box
          width={{ xs: "100%", md: "80%" }}
          height={{ xs: "30vh", md: "50vh" }}
          marginX={"auto"}
          marginTop={"10vh"}
          borderRadius={"8px"}
          sx={{
            backgroundColor: "black",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            rowGap: "10px",
          }}
        >
          <Typography variant="h3" fontFamily={"cursive"}>
            All Categories
          </Typography>
          <ButtonGroup
            variant="contained"
            aria-label="outlined primary button group"
          >
            {categories.map((item) => (
              <Button
                onClick={() => router.push(`/category/${item.slug}`)}
                key={item.slug}
              >
                {item.label}
              </Button>
            ))}
          </ButtonGroup>
        </Box>
      </Layout>
    </Seo>
  );
};

export default CategoryPage;

export const getServerSideProps: GetServerSideProps<
  CategoryPageProps
> = async () => {
  const categories = await BlogService.getCategories();
  return {
    props: {
      categories,
    },
  };
};

interface CategoryPageProps {
  categories: CategoryType[];
}
