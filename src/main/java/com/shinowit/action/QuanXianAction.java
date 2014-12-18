package com.shinowit.action;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.MenuDAO;
import com.shinowit.entity.TreeNode;
import org.apache.struts2.ServletActionContext;


import javax.annotation.Resource;

/**
 * Created by Administrator on 2014/12/9.
 */
public class QuanXianAction extends ActionSupport {
    @Resource
    private MenuDAO menudao;

    private TreeNode node;

    public String quanxianselect(){

        String roleid = (String)ServletActionContext.getRequest().getSession().getAttribute("role_id");

        node=menudao.queryModule(roleid);


        return SUCCESS;

    }

    public TreeNode getNode() {
        return node;
    }

    public void setNode(TreeNode node) {
        this.node = node;
    }

}
