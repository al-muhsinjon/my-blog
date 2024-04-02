import { Content } from "@/src/components";
import { BlogsType } from "@/src/interfaces/blogs.interface";
import Layout from "@/src/layout/layout";
import Seo from "@/src/layout/seo/seo";
import { BlogService } from "@/src/services/blog.service";
import { Box } from "@mui/material";
import { GetServerSideProps } from "next";
import React from "react";

const BlogPage = ({ blogs }: BlogPageProps) => {
  return (
    <Seo metaTitle="All Blogs">
      <Layout>
        <Box
          sx={{
            display: "flex",
            gap: "20px",
            flexDirection: { xs: "column", md: "row" },
            padding: "20px",
            justifyContent: "center",
          }}
        >
          <Content blogs={blogs} />
        </Box>
      </Layout>
    </Seo>
  );
};

export default BlogPage;

export const getServerSideProps: GetServerSideProps<
  BlogPageProps
> = async () => {
  const blogs = await BlogService.getAllBlogs();
  return {
    props: { blogs },
  };
};

interface BlogPageProps {
  blogs: BlogsType[];
}
