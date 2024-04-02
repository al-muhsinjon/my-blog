import React, { useEffect } from "react";
import Layout from "../layout/layout";
import { Content, Hero, Sidebar } from "../components";
import { Box } from "@mui/material";
import { BlogService } from "../services/blog.service";
import { GetServerSideProps } from "next";
import { BlogsType } from "../interfaces/blogs.interface";
import { CategoryType } from "../interfaces/categories.interface";
import Seo from "../layout/seo/seo";
// import { Content } from "next/font/google";

const IndexPage = ({ blogs, latestBlogs, categories }: HomePageProps) => {
  useEffect(() => {
    BlogService.getAllBlogs().then((data) => console.log(data));
  }, []);

  return (
    <Seo
      
    >
      <Layout>
        <Hero blogs={blogs.slice(0, 3)} />
        <Box
          sx={{
            display: "flex",
            gap: "20px",
            flexDirection: { xs: "column", md: "row" },
            padding: "20px",
          }}
        >
          <Sidebar latestBlogs={latestBlogs} categories={categories} />
          <Content blogs={blogs} />
        </Box>
      </Layout>
    </Seo>
  );
};

export default IndexPage;

export const getServerSideProps: GetServerSideProps<
  HomePageProps
> = async () => {
  const blogs = await BlogService.getAllBlogs();
  const latestBlogs = await BlogService.getLatestBlog();
  const categories = await BlogService.getCategories();

  return {
    props: {
      blogs,
      latestBlogs,
      categories,
    },
  };
};

interface HomePageProps {
  blogs: BlogsType[];
  latestBlogs: BlogsType[];
  categories: CategoryType[];
}
