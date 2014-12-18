package com.shinowit.action;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDAO;
import com.shinowit.entity.TAuOperInfo;
import org.apache.struts2.ServletActionContext;

import javax.annotation.Resource;
import javax.servlet.Servlet;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpSession;
import javax.websocket.Session;
import java.util.List;

/**
 * Created by Administrator on 2014-11-06.
 */

public class loginAction extends ActionSupport {
    private TAuOperInfo oper;
    private boolean success;
    private boolean faile;
    private String message;
    private String valide;
    private List<TAuOperInfo> list;
    @Resource
    private BaseDAO<TAuOperInfo> dao;

//  HttpServletRequest request = ServletActionContext.getRequest();
//  HttpSession session = request.getSession();
//  String realchecknum = (String)session.getAttribute("rand");

    String realchecknum1 = (String)ServletActionContext.getRequest().getSession().getAttribute("rand");
    HttpSession session=ServletActionContext.getRequest().getSession();

    public String login(){
        list=dao.listAll(TAuOperInfo.class);
        for(TAuOperInfo u:list){
            if(u.getOperName().trim().equals(oper.getOperName().trim())&&u.getPwd().trim().equals(oper.getPwd().trim())&&realchecknum1.equals(valide.trim())){
                session.setAttribute("username",u.getOperName());
                session.setAttribute("role_id",u.getTAuRoleInfoByRoleId().getRoleId());
//              ServletActionContext.getContext().getSession().put("username",u.getOperName());
                setSuccess(true);
                setFaile(true);
                setMessage("恭喜您，登陆成功！");
                return SUCCESS;
            }
        }
            setSuccess(true);
            setFaile(false);
            setMessage("您输入的信息有误，请重新输入！");
            return SUCCESS;
    }

    public List<TAuOperInfo> getList() {
        return list;
    }

    public void setList(List<TAuOperInfo> list) {
        this.list = list;
    }

    public TAuOperInfo getOper() {
        return oper;
    }

    public void setOper(TAuOperInfo oper) {
        this.oper = oper;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public boolean isFaile() {
        return faile;
    }

    public void setFaile(boolean faile) {
        this.faile = faile;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getValide() {
        return valide;
    }

    public void setValide(String valide) {
        this.valide = valide;
    }
}
