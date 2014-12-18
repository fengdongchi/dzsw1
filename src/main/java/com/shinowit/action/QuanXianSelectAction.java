package com.shinowit.action;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.MenuCheckDAO;
import com.shinowit.dao.MenuDAO;
import com.shinowit.entity.TreeNodeCheck;
import org.apache.struts2.ServletActionContext;

import javax.annotation.Resource;

/**
 * Created by Administrator on 2014/12/9.
 */
public class QuanXianSelectAction extends ActionSupport {
    @Resource
    private MenuCheckDAO menucheckdao;

    private TreeNodeCheck checknode;

    public String quanxianselect(){

        String roleid = (String)ServletActionContext.getRequest().getSession().getAttribute("role_id");

        checknode=menucheckdao.queryModule(roleid);


        return SUCCESS;

    }

    public TreeNodeCheck getChecknode() {
        return checknode;
    }

    public void setChecknode(TreeNodeCheck checknode) {
        this.checknode = checknode;
    }
}
