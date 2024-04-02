import { Sidebar } from "@/src/components";
import { calculateEstimatedTimeToRead } from "@/src/helpers/time.format";
import { BlogsType } from "@/src/interfaces/blogs.interface";
import { CategoryType } from "@/src/interfaces/categories.interface";
import Layout from "@/src/layout/layout";
import Seo from "@/src/layout/seo/seo";
import { BlogService } from "@/src/services/blog.service";
import { Avatar, Box, Typography } from "@mui/material";
import { format } from "date-fns";
import { GetServerSideProps } from "next";
import Image from "next/image";
import React from "react";

const DetailedBlogsPage = ({
  blog,
  latestBlogs,
  categories,
}: DetailedBlogsPageProps) => {
  return (
    <Seo metaTitle={blog.title}>
      <Layout>
        <Box
          sx={{
            display: "flex",
            gap: "20px",
            flexDirection: { xs: "column", md: "row" },
            padding: "20px",
          }}
        >
          <Box width={{ xs: "100%", md: "70%" }}>
            <Box
              sx={{
                backgroundColor: "black",
                padding: "20px",
                borderRadius: "8px",
                boxShadow: "0px 8px 16px rgba(255, 255, 255, .1)",
              }}
              width={"100%"}
              height={{ xs: "30%", md: "50vh" }}
              position={"relative"}
            >
              <Image
                src={blog.image.url}
                alt="img"
                fill
                style={{ objectFit: "cover", borderRadius: "10px" }}
              />
            </Box>
            <Box display={"flex"} flexDirection={"column"} rowGap={"10px"}>
              <Box sx={{ display: "flex", gap: "10px", marginTop: "40px" }}>
                <Avatar alt={blog.author.name} src={blog.author.avatar.url} />
                <Box>
                  <Typography>{blog.author.name}</Typography>
                  <Box>
                    {format(new Date(blog.createdAt), "dd MMM, yyyy")} &#x2022;
                    {calculateEstimatedTimeToRead(blog.description.text)}
                    min read{" "}
                  </Box>
                </Box>
              </Box>
              <Typography variant="h3" marginTop={"20px"}>
                {blog.title}
              </Typography>
              <Typography variant="body1" color={"gray"}>
                {blog.exerpt}
              </Typography>
              <div
                style={{ opacity: "0.8" }}
                dangerouslySetInnerHTML={{ __html: blog.description.html }}
              />
            </Box>
          </Box>
          <Sidebar latestBlogs={latestBlogs} categories={categories} />
          {/* <Content blogs={blogs} /> */}
        </Box>
      </Layout>
    </Seo>
  );
};

export default DetailedBlogsPage;

export const getServerSideProps: GetServerSideProps<
  DetailedBlogsPageProps
> = async ({ query }) => {
  const blog = await BlogService.getDetailedBlogs(query.slug as string);
  const latestBlogs = await BlogService.getLatestBlog();
  const categories = await BlogService.getCategories();

  return {
    props: {
      blog,
      latestBlogs,
      categories,
    },
  };
};

interface DetailedBlogsPageProps {
  blog: BlogsType;
  latestBlogs: BlogsType[];
  categories: CategoryType[];
}
