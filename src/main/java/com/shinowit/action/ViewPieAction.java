package com.shinowit.action;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDAO;
import com.shinowit.entity.ViewPie;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Administrator on 2014/12/5.
 */
public class ViewPieAction extends ActionSupport {

    @Resource
    private BaseDAO<ViewPie> viewPieDAO;

    private List<ViewPie> viewPieList;

    public  String viewpie(){
        viewPieList=viewPieDAO.listAll(ViewPie.class);
        return SUCCESS;
    }

    public List<ViewPie> getViewPieList() {
        return viewPieList;
    }

    public void setViewPieList(List<ViewPie> viewPieList) {
        this.viewPieList = viewPieList;
    }
}
